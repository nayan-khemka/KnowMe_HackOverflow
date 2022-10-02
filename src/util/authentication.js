import React from "react";

    const createToken = (data) => {
        console.log(data.apiKey);
        console.log(data.username);
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