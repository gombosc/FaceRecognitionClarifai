import React, { useState } from "react";
import "./Sign-in.css";

const SignIn = ({onRouteChange}) =>{
    const [ signInEmail, setSignInEmail ] = useState("");
    const [ signInPassword, setSignInPassword ] = useState("");

    const onEmailSignIn = (event) =>{
        setSignInEmail(event.target.value)
    }

    const onPasswordlSignIn = (event) =>{
        setSignInPassword(event.target.value)
    }

    const onLoginSubmit = () =>{
        fetch("http://localhost:3000/signIn", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Success'){
               onRouteChange("face-detection-app")
            }
        }) 
        .catch(error => console.log(error));
        }

    return(
        <article className="br3 shadow-5 ba dark-gray b--white mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailSignIn}
                        className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordlSignIn}
                        className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={onLoginSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={ () => onRouteChange("register") } className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article> 
    )
}

export default SignIn;