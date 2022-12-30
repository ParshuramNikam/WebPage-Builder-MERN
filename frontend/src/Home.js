import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "./redux/actions/pageAction";
import HomeNav from './components/HomeNav';
import { useHistory } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";

const Home = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({});
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    }
    createPage(name)(dispatch);
  };

  const getUserDetails = async () => {
    await fetch('http://localhost:5000/auth/protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken: localStorage.getItem('web_builder_access_token')
      })
    }).then((res) => res.json())
      .then((result) => {
        if (result.status === 'success') {
          setUserDetails(result.user)
          setIsLoggedIn(true);
        } else {
          history.push('/login');
          console.log('web_builder_access_token not found');
        }
      }).catch((err) => {
        console.log("Error in get User details :", err.message, err);
      })
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  if (!isLoggedIn) {
    return <LoadingPage />
  }

  return (
    <>
      <HomeNav />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <form id="create-page">
              <div className="modal-header">
                <h5 className="modal-title" id="addPageModalLabel">
                  Create Page
                </h5>
              </div>
              <div className="modal-body">
                <div className="col-auto">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control px-3 py-2 form-control-sm ${isValid ? "" : "is-invalid"}`}
                    id="name"
                    name="name"
                    placeholder="Name of Page"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!isValid && (
                    <div className="invalid-feedback">
                      Please provide a valid name.
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary "
                  data-bs-dismiss="modal"
                  onClick={() => setName("")}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-primary "
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 my-3 ">
            <div class="table-responsive">
              <table className="table  table-bordered table-hover">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Slug</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {pages
                    ? pages.map((page) => (
                      <tr key={page._id}>
                        <td>{page._id}</td>
                        <td>{page.name}</td>
                        <td>{page.slug}</td>
                        <td>
                          <Link to={`/editor/${page._id}`}>Edit</Link>
                        </td>
                      </tr>
                    ))
                    : "No Page"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
