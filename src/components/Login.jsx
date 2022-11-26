import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  const [loginMessage, setLoginMessage] = useState("");

  // Validate Function
  const validate = () => {
    const errorsData = {};

    // email
    errorsData.email = [];
    if (!email) {
      errorsData.email.push("Email can not be blank");
    }

    // email regex
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    // password
    errorsData.password = [];

    // password can not blank
    if (!password) {
      errorsData.password.push("Password can not be blank");
    } 


    //password regex
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Your password is Incorrect"
        );
      }
    }

    setErrors(errorsData);
  };

  useEffect(() => validate, [email, password]);

  const isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) valid = false;
    }
    return valid;
  };

  useEffect(() => validate())

  const onLoginClick = async (e) => {
    e.preventDefault();
    let dirtyData = dirty;

    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });

    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        let responseBody = await response.json();
        if (responseBody.length > 0) {
          props.history.replace("/dashboard");
        } else {
          setLoginMessage(
            <span className="bg-red-200">Invalid Login, Please Try Again</span>
          );
        }
      } else {
        setLoginMessage(
          <span className="bg-red-200">Unable to connect to server</span>
        );
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Login Page
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            {/* Main Inputs of Login */}
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <p className="text-red-900 mt-2">
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <p className="text-red-900 mt-2">
                  {dirty["password"] && errors["password"][0] ? errors["password"] : ""}
                </p>
              </div>

              {/* Footer of the Login */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={onLoginClick}
                type="submit"
                className="w-full hover:bg-slate-900 hover:text-white duration-300 border dark:border-white dark:hover:bg-white dark:hover:text-slate-900 border-slate-900 dark:text-white dark:bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <div>{loginMessage}</div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
