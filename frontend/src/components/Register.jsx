import "./register.css";
import { useEffect, useState, useRef } from "react";
import {Room, Cancel} from '@mui/icons-material';
import axios from "axios";

export default function Register({setShowRegister}){

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try{
            await axios.post("/users/register", newUser);
            setError(false);
            setSuccess(true);
        } catch(err){
            setError(true);
            setSuccess(false);
        }

    };


    return(
        <div className="registerContainer">
            <div className="logo">
                <Room />
                Pin Diary
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username.." ref={nameRef}/>
                <input type="email" placeholder="Email.." ref={emailRef}/>
                <input type="password" placeholder="Password.." ref={passwordRef}/>
                <button className="registerBtn" type="submit">Register</button>
                {success && (
                    <span className="success">Registration Successful. You can now login!</span>
                )}
                {error && (
                    <span className="failure">Something went wrong!</span>
                )}
            </form>
            <Cancel className="registerCancel" onClick={() => setShowRegister(false)}/>
        </div>
    )
}