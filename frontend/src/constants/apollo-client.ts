import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";

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

client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([logoutLink, httpLink]),
});

export default client;
