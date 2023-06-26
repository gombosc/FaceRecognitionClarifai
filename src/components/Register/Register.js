import React, {useState, useEffect} from "react";

const Register = ({onRouteChange, loadUserData}) =>{
    const [ registerEmail, updateEmail ] = useState("");
    const [ registerPassword, updatePassword ] = useState("");
    const [ userName, updateUserName ] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    useEffect( () => {
        const handleKeyPress = (event) => {
            if( event.key === "Enter") 
            {
                console.log("Pressed Enter");
                onRegisterSubmit();
            }
        }
        
        document.addEventListener("keydown", handleKeyPress)

        // We return a cleanup function from the effect by using return. This cleanup function removes the event listener when the component unmounts. This ensures that we don't have any memory leaks
        return () =>{
            document.removeEventListener("keydown", handleKeyPress)
        }
        // the dependency array is omitted so the effect runs every render
    });

    const onEmailRegister = (event) =>{
        updateEmail(event.target.value)
    }

    const onPasswordRegister = (event) =>{
        updatePassword(event.target.value)
    }

    const onUsernameRegister = (event) =>{
        updateUserName(event.target.value)
    }

    const onRegisterSubmit = () =>{
        if (registerEmail.trim() === '' || registerPassword.trim() === '' || userName.trim() === '') {
            setErrorMessage('Form is empty');
            return;
        }
        else{
            fetch("http://localhost:3000/register", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: registerEmail,
                    password: registerPassword,
                    name: userName,
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    loadUserData(user);
                    onRouteChange("face-detection-app")
                }
            }) 
            .catch(error => console.log(error));
            }
        }

    return(
        <article className="br3 shadow-5 ba dark-gray b--white mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Register</legend>

                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 w-100" htmlFor="name">Name</label>
                        <input onChange={onUsernameRegister}
                        className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="text" name="name"  id="name" required={true}/>
                    </div>

                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 w-100" htmlFor="email-address">Email</label>
                        <input onChange={onEmailRegister} 
                        className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="email" name="email-address"  id="email-address"/>
                    </div>

                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 w-100" htmlFor="password">Password</label>
                        <input onChange={onPasswordRegister}
                        className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="password" name="password"  id="password"/>
                    </div>
                    
                    {errorMessage && <p className="red f5 b">{errorMessage}</p>}
                    </fieldset>
                    <div className="">
                    <input onClick={onRegisterSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                </div>
            </main>
        </article> 
    )
}

export default Register;