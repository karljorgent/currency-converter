import { useNavigate } from 'react-router-dom';

function LogIn() {
    // redirect to main page
    let navigateToMain = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.form[0].value;
        const password = event.target.form[1].value;

        const data = { username: username, password: password };

        const options = {
            method: 'POST',
            headers: {
                cookie: 'connect.sid=s%253AbcqSAy1u4WnP-KXf_H8MNBxPlR-cqMMe.%252BlDFQBMr1N0fsJBPWZ0GeeH8d6EF9b7GDqzIRDAC%252Bfo',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log(event.target.form[0].value);
        console.log(event.target.form[1].value);

        fetch('http://localhost:7777/is-admin', options)
            .then((response) => response.json())
            .then((response) => {
                if ((response = true)) {
                    navigateToMain('../');
                    console.log(response);
                } else {
                    alert('Invalid Credentials');
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <form>
            Username:
            <input type="text" name="name" placeholder="admin" />
            Password:
            <input type="password" name="name" placeholder="password" />
            <input type="submit" value="Log In" onClick={handleSubmit} />
            <input type="submit" value="Cancel" onClick={navigateToMain('../')} />
        </form>
    );
}
export default LogIn;
