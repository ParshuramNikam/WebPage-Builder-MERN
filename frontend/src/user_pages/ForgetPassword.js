import React from 'react'
import forgetPasswordStyles from '../styles/forgetPassword.module.css';

const ForgetPassword = () => {

  const [email, setEmail] = React.useState('');

  const forgetPasswordHandler = (e) => {
    e.preventDefault();

    if (!email) return alert("Please enter your email");
    fetch('http://localhost:5000/auth/forget-password?email='+ email)
    .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status === 'success') {
          alert(data.message);
        } else {
          alert(data.message);
        }
      }
      )
      .catch(err => console.log(err));
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
                  <h2 class="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div class="panel-body">

                    <form id="register-form" role="form" autocomplete="off" class="form" method="post" onSubmit={forgetPasswordHandler}>
                      <div class="form-group mb-3">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input required id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email address" class="form-control p-2" type="email" />
                        </div>
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

export default ForgetPassword