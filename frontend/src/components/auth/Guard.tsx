import {useGetMe} from "../../hooks/useGetMe";
import {JSX} from "react";
import excludedRoutes from "../../constants/excluded-routes";

interface GuardProps {
    children: JSX.Element;
}

const Guard = ({children}:GuardProps) =>  {
    const { data: user,error } = useGetMe();

    console.log('USER ----> ',user);


    return(<>
        {
            excludedRoutes.includes(window.location.pathname) ? children: (user && children)
        }
    </>)




}

export default Guard;