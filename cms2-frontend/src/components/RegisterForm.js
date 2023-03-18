import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCaptcha from "./ReCaptcha";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [error, setError] = useState("");

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const navigate = useNavigate();

  const HandleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        captchaValue: captchaValue,
      }),
    };
     const res = await fetch("/users/register", requestOptions)
     const {response} = await res.json();

        if(response.username){
          navigate("/login")
        }else{
          setError(response)
        }
  };
  
  return (
    <div className="flex justify-center text-center">
      <div>
        <h1>Register form</h1>
        <form onSubmit={HandleSubmit} className="form">
          <label>Enter username:</label>
          <input
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={username}
            name="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Enter email:</label>
          <input
            className="w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            value={email}
            name="text"
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
          <ReCaptcha
            sitekey="6Lc-bLMkAAAAAHEi2ULDFXBlWKGiH0Ap6s4Pw85c"
            onChange={handleCaptchaChange}
          />
        </form>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default RegisterForm;
