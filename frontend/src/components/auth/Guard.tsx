import {useGetMe} from "../../hooks/useGetMe";
import {JSX, useEffect} from "react";
import excludedRoutes from "../../constants/excluded-routes";
import {authenticateVar} from "../../constants/authenticated";

interface GuardProps {
    children: JSX.Element;
}

const Guard = ({children}:GuardProps) =>  {
    const { data: user,error } = useGetMe();


    useEffect(()=>{

        if (user){
            authenticateVar(true);

        }

    },[user])

    //console.log('USER ----> ',user);


    return(<>
        {
            excludedRoutes.includes(window.location.pathname) ? children: (user && children)
        }
    </>)




}

export default Guard;