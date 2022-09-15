import React from "react";

function SignIn() {
    function doStuff(e) {
        console.log('y press button???');
    }
    return ( 
        <div>
            <button onClick={doStuff}>Log In</button>
        </div> 
    )
}

export default SignIn;