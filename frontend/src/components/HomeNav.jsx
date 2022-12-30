import React from 'react'
import { Link, useHistory } from "react-router-dom";

const HomeNav = () => {
    let history = useHistory();

    const logoutHandler = (e) => {
        e.preventDefault()

        fetch('http://localhost:5000/auth/logout',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: localStorage.getItem('web_builder_access_token')
                })
            }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status === 'success') {
                    history.push('/login');
                    localStorage.removeItem('web_builder_access_token');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="bg-light">
            <nav className="px-2 container navbar navbar-light bg-light justify-content-between">
                <Link to={"/"} className="navbar-brand">Page Builder</Link>
                <button className="btn btn-danger my-2 my-sm-0" type="button"
                    onClick={logoutHandler}
                >
                    Logout
                </button>
            </nav>
        </div>
    )
}

export default HomeNav