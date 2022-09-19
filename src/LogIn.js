import {useNavigate} from "react-router-dom";

function LogIn() {

    // redirect to admin page
    let navigateToAdmin = useNavigate();
    const routeToAdmin = () => {
        let path = `../kH@xp&69co@Yj9NLjnQQRfGmYGLdTSQ4dzHBQ&or`;
        navigateToAdmin(path);
    }

    // redirect to main page
    let navigateToMain = useNavigate();
    const routeToMain = () => {
        let path = `../`;
        navigateToMain(path);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target.form[0].value === 'admin' && event.target.form[1].value === 'password') {
            routeToAdmin()
        } else {
            alert("Invalid Credentials")
        }
    }



    return (
        <form>
            Username:
            <input type="text" name="name" placeholder="admin" />
            Password:
            <input type="password" name="name" placeholder="password" />
            <input type="submit" value="Log In" onClick={handleSubmit}/>
            <input type="submit" value="Cancel" onClick={routeToMain}/>
        </form>
    )
}
export default LogIn;