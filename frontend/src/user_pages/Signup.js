import React from "react";
import loginStyles from '../styles/login.module.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    let history = useHistory();

    const signupHandler = (e) => {
        e.preventDefault();

        if (!email || !password || !fullName) return alert("Please enter all fields");

        fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password,
                fullName: fullName,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.status === "success") {
                    alert(data.message);
                    history.push('/')
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={loginStyles.form_container}>
            <div className={loginStyles.form_wrapper}>
                <h2 className={loginStyles.form_title}>Sign Up</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control
                            name="fullname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            placeholder="Full Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(!showPassword)}
                            label="&nbsp; Show password"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={signupHandler}
                        className={loginStyles.login_button}
                    >
                        Signup{" "}
                    </Button>
                    <br /> <br />
                    Already have an account! &nbsp;
                    <Link to="/login" className={loginStyles.register_link}>
                        Login
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
