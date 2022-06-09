import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const token = sessionStorage.getItem("token");

    const handleClick = () => {
        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
        fetch("https://3001-4geeksacade-reactflaskh-lubk4b3spvj.ws-us47.gitpod.io/api/token", opts)
        .then(resp => {
            if(resp.status === 200) return resp.json();
            else alert("There has been some error");
        })
        .then(data => {
            console.log("Data", data);
            sessionStorage.setItem("token", data.access_token);
        })
        .cath(error => {
            console.log("There was an error", error);
        })
    }

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
                {(token && token !== "" && token !== undefined) ? "You are logged in with this token" + token :
            <div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
            </div>
                }
		</div>
	);
};
