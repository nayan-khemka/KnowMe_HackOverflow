import React from "react";

    const createToken = (data) => {
        localStorage.username = data.username;
        localStorage.apiKey = data.apiKey;
    }

    const clearToken = () => {
        localStorage.clear();
    }
    
    const checkAuthentication = () => {
        if(localStorage.apiKey){
            return true;
        } else {
            return false;
        }
    }
   
export {createToken, clearToken, checkAuthentication};