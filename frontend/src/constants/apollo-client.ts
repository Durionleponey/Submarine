import {ApolloClient, from, HttpLink, InMemoryCache, split} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {API_URL, WS_URL} from "./urls";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

// Déclaration temporaire pour pouvoir l'utiliser dans logoutLink
let client: ApolloClient<any>;

const logoutLink = onError((error) => {
    const originalError = error.graphQLErrors?.[0]?.extensions?.originalError as { statusCode?: number };
    const statusCode = originalError?.statusCode;

    if (statusCode === 401) {
        if (!excludedRoutes.includes(window.location.pathname)) {
            router.navigate("/login");
            client.resetStore(); // ici, client est bien défini
        }
    }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const wsLink = new GraphQLWsLink(
    createClient({
        url:`ws://${WS_URL}/graphql`
    })
)

const splitLink = split(//filter to know if the query is a mutation of not
    ({ query }) => {
        const definition = getMainDefinition(query)

        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
    },wsLink,httpLink)

client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([logoutLink, splitLink]),
});

export default client;
