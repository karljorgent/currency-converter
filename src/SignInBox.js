import React from "react";

function SignInBox() {
    const {useState} = React;
    const [emailerror,setEmailError] = useState("");
    const [passworderror,setPasswordError] = useState("");
    const [inputValues,setInputValues] = useState({
        email:"",
        password:"",
    }); 
   
       
    const inputEvent = (e)=>{  
        console.log(inputValues);
        var {name,value} = e.target;
        setInputValues((previousValue)=>{
            if(name =="email"){
                return {
                    email:value,
                    password:previousValue.password
                }
            }else if(name =="password"){
               return {
                    password:value,
                    email:previousValue.email
                } 
            }
        }); 
    }  
  
    const formSubmit = (e)=>{
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        if(inputValues.email ==""){
            setEmailError("Email not valid");
            return false; 
        }else if(inputValues.password ==""){
            setPasswordError("Password not valid");
            return false;
        }else{
            alert("form submitted");
        }
    } 
   
    const validation = ()=>{
  
    }
     
    return (
            <div className="card">
               
                <h6>Login</h6>
                <ul className="social">
                <li><i className="fa fa-facebook"></i></li>
                <li><i className="fa fa-linkedin"></i></li>
                <li><i className="fa fa-google"></i></li>
                <li><i className="fa fa-instagram"></i></li> 
                </ul>
                <form onSubmit={formSubmit}>
                <div className="input_text">               
                    <input 
                        type="text" 
                        value={inputValues.email} 
                        onChange={inputEvent} 
                        autoComplete="false" 
                        name="email"
                    />
                    <span>Email</span>
                    <small>{emailerror}</small>
                </div> 
                 
                <div className="input_text">
                    <input 
                         type="text"
                         value={inputValues.password} 
                         onChange={inputEvent} 
                         autoComplete="false"
                         name="password"
                    />
                    <span>Password</span> 
                    <small>{passworderror}</small>
                </div>
                
                <div className="submit_button">
                    <button type="submit">Login</button>
                </div>
                </form>
            </div>
    );
}

export default SignInBox;