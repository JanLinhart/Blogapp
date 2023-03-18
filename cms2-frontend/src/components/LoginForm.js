import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ReCaptcha from "./ReCaptcha";

function LoginForm({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [captchaValue, setCaptchaValue] = useState("");
  const [error, setError] = useState("");

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const navigate = useNavigate();

  const HandleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        captchaValue: captchaValue,
      }),
    };
    const response = fetch("/users/login", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result));

    if (data.token) {
      Cookies.set("jwt", data.token);
      Cookies.set("isSignedIn", true);
      setIsAuthenticated(true);
      navigate(`/posts/${data.userData[0]._id}`);
    } else {
      setError(data.message);
    }
  };
  return (
    <div className="flex justify-center text-center">
      <div>
        <h1>Login form</h1>
        <form onSubmit={HandleSubmit} className="form">
          <label>Enter username:</label>
          <input
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={username}
            name="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Enter password:</label>
          <input
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={password}
            name="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
            type="submit"
          >
            Login
          </button>
          <ReCaptcha
            sitekey="6Lc-bLMkAAAAAHEi2ULDFXBlWKGiH0Ap6s4Pw85c"
            onChange={handleCaptchaChange}
          />
        </form>
        {error}
      </div>
    </div>
  );
}

export default LoginForm;
