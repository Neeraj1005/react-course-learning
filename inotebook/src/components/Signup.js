import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";
  const history = useHistory();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", c_password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.c_password) {
        alert('Password Not Matched')
    }
    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.status === 200) {
        localStorage.setItem('token', json.token);
        history.push('/')
    } else {
        alert('invalid')
    }
  };

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className="card my-5">
      <div className="card-header">
        <h5>Register</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group mb-2">
            <label htmlFor="name" className="form-control-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              id="name"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email" className="form-control-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="email"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="form-control-label">
              PASSWORD
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="c_password" className="form-control-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.c_password}
              onChange={onChange}
              name="c_password"
              id="c_password"
            />
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary mb-1 float-end">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
