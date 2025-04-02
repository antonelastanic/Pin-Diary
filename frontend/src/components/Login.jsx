import "./login.css";
import axios from "axios";
import { useState, useRef } from "react";
import {Room, Cancel} from '@mui/icons-material';


export default function Login({setShowLogin, setCurrentUser, myStorage}){


    const [error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };

        try{
            const res = await axios.post("/users/login", user);
            console.log(res.data.username)
            myStorage.setItem('user', res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false)        
        } catch(err){
            setError(true);
        }

    };


    return(
        <div className="loginContainer">
            <div className="logo">
                <Room />
                PinDiary
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username.." ref={nameRef}/>
                <input type="password" placeholder="Password.." ref={passwordRef}/>
                <button className="loginBtn" type="submit">Login</button>

                {error && (
                    <span className="failure" >Something went wrong!</span>
                )}
            </form>
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)}/>
        </div>
    )
}