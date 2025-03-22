import {useGetMe} from "../../hooks/useGetMe";
import {JSX} from "react";

interface GuardProps {
    children: JSX.Element;
}

const Guard = ({children}:GuardProps) =>  {
    const { data: user } = useGetMe();
    console.log(user);
    return children;


}

export default Guard;