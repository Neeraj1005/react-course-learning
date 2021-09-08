import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const history = useHistory();
  const [credentials, setCredentials] = useState({email: "", password: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
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
        <h5>Login</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
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
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary mb-1 float-end">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
