import React from 'react'
import loginStyles from '../styles/login.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    let history = useHistory();

    const loginHandler = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    localStorage.setItem('web_builder_access_token', data.access_token);
                    localStorage.setItem('web_builder_user_id', data.userId);
                    history.push('/');
                } else {
                    alert(data.message);
                }
            }
            )
            .catch(err => console.log(err));
    }

    return (
        <div className={loginStyles.form_container}>
            <div className={loginStyles.form_wrapper}>
                <h2 className={loginStyles.form_title}>Login</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={showPassword ? "text" : "password" } value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(!showPassword)} label="&nbsp; Show password" />
                    </Form.Group>
                    <Row className="mb-5">
                        <Col>
                            <Button variant="primary" type="submit" onClick={loginHandler} className={loginStyles.login_button}>Login </Button>
                        </Col>
                        <Col clasName="text-right">
                            <Form.Group className={loginStyles.forgot_password_wrapper}>
                                <Link to="/forget-password" className={loginStyles.forgot_password}>Forgot password?</Link>
                            </Form.Group>
                        </Col>
                    </Row>

                    Don't have an account! &nbsp;
                    <Link to="/signup" className={loginStyles.register_link}>Register</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login