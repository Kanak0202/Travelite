import React, { useContext } from "react";
import {Navigate, Outlet} from 'react-router-dom';
import { DataContext } from "../context/DataProvider";

const PrivateComponent = ()=>{
    const {account} = useContext(DataContext);
    return (
        account.email!=="" ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateComponent;