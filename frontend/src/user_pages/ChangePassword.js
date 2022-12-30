import React from 'react'
import forgetPasswordStyles from '../styles/forgetPassword.module.css';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {

    const { userId, otp } = useParams();
    const [password, setPassword] = React.useState('');
    const [cpassword, setCpassword] = React.useState('');
    let history = useHistory();
    
    const changePasswordHandler = (e) => {
        e.preventDefault();

        if (!password) return alert("Please enter password");
        if (!cpassword) return alert("Please enter confirm password");
        if (password !== cpassword) return alert("Password and confirm password must be same");

        const reqURL = 'http://localhost:5000/auth/change-password/' + userId + "/" + otp;

        fetch(reqURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                cpassword
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    alert(data.message);
                    history.push('/login')
                } else {
                    alert(data.message);
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className={forgetPasswordStyles.form_container}>
            <div class={`container`}>
                <div class={`row align-items-center justify-content-center ${forgetPasswordStyles.forget_password_wrapper}`}>
                    <div class="col-md-4 col-md-offset-4">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="text-center">
                                    <h3><i class="fa fa-lock fa-4x"></i></h3>
                                    <h2 class="text-center">Change Password</h2>
                                    <div class="panel-body">

                                        <form id="register-form" role="form" autocomplete="off" class="form text-left" method="post" onSubmit={changePasswordHandler}>

                                            <div class="form-group mb-3 text-left mt-3">
                                                <label for="InputPassword1" className="mb-1">Password</label>
                                                <input type="password" class="form-control" id="InputPassword1" placeholder="Password"
                                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div class="form-group mb-3 text-left">
                                                <label for="InputPassword2" className="mb-1">Confirm Password</label>
                                                <input type="password" class="form-control" id="InputPassword2" placeholder="Confirm Password"
                                                    value={cpassword} onChange={(e) => setCpassword(e.target.value)}
                                                />
                                            </div>

                                            <div class="form-group mb-3">
                                                <input name="recover-submit" class="btn btn-lg btn-primary btn-block rounded-lg"
                                                    value="Reset Password" type="submit"
                                                />
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default ChangePassword