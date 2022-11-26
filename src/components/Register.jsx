import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetter: "",
  });

  const [countries, setCountries] = useState([
    { id: 1, countryName: "Iran" },
    { id: 2, countryName: "Indian" },
    { id: 3, countryName: "Usa" },
    { id: 4, countryName: "Uk" },
    { id: 5, countryName: "Brazil" },
    { id: 6, countryName: "Japan" },
    { id: 7, countryName: "France" },
    { id: 8, countryName: "Canada" },
  ]);

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dateOfBirth: false,
    gender: false,
    country: false,
    receiveNewsLetter: false,
  });

  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
    dateOfBirth: [],
    gender: [],
    country: [],
    receiveNewsLetter: [],
  });

  useEffect(() => validate, []);

  useEffect(() => {
    document.title = "Register";
  }, []);

  const validate = () => {
    let errorsData = {};

    // email
    errorsData.email = [];

    // email cant be blank
    if (!state.email) {
      errorsData.email.push("Email can not be blank");
    }

    // email regex
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Propper Email Address Is Expected");
      }
    }

    // password
    errorsData.password = [];

    // password cant be blank
    if (!state.password) {
      errorsData.password.push("Password can not be blank");
    }

    // password regex
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;

    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Password should between 6 and 15 characters and at least one Uppercase latter and Lowercase letter and a digit"
        );
      }
    }

    // fullName
    errorsData.fullName = [];

    // full name cant be blank
    if (!state.fullName) {
      errorsData.fullName.push("Full Name can not be blank");
    }

    // Birthday
    errorsData.dateOfBirth = [];

    // Birth Date cant be blank
    if (!state.dateOfBirth) {
      errorsData.dateOfBirth.push("Date of Date can not be blank");
    }

    // Gender
    errorsData.gender = [];

    // Birth Date cant be blank
    if (!state.gender) {
      errorsData.gender.push("Please Select your gender type");
    }

    // Country
    errorsData.country = [];

    // Birth Date cant be blank
    if (!state.country) {
      errorsData.country.push("Please Select your Country");
    }

    setErrors(errorsData);
  };

  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) valid = false;
    }
    return valid;
  };

  useEffect(() => validate(), []);


  const onRegisterClick = async (e) => {

    e.preventDefault();

    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });

    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          fullName: state.fullName,
          dateOfBirth: state.dateOfBirth,
          gender: state.gender,
          country: state.country,
          receiveNewsLetter: state.receiveNewsLetter,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        setMessage(<span className="bg-green-300 px-2">Successfully Registered</span>);
        props.history.replace('/dashboard')
      }
    } else {
      setMessage(<span className="bg-red-300 px-2">Errors in database connection</span>);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto  lg:py-0">
        <a
          href="#"
          className="flex items-center my-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Register Page
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <ul className="tex-red-200 flex flex-col items-center">
              {/* {Object.keys(errors).map((control) => {
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return (
                      <li className="text-red-900" key={err}>
                        {err}
                      </li>
                    );
                  });
                } else {
                  return "";
                }
              })} */}
            </ul>

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            {/* Main Inputs of Login */}
            <form className="space-y-4 md:space-y-6" action="#">
              {/* Email */}
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
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <p className="text-red-900 mt-2">
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </p>
              </div>
              {/* Password */}
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
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <p className="text-red-900 mt-2">
                  {dirty["password"] && errors["password"][0]
                    ? errors["password"]
                    : ""}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Your Date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={state.fullName}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <p className="text-red-900 mt-2">
                  {dirty["fullName"] && errors["fullName"][0]
                    ? errors["fullName"]
                    : ""}
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dataOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dataOfBirth"
                  placeholder="Your Birth Date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={state.dateOfBirth}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
                <p className="text-red-900 mt-2">
                  {dirty["dateOfBirth"] && errors["dateOfBirth"][0]
                    ? errors["dateOfBirth"]
                    : ""}
                </p>
              </div>

              {/* Gender for both types of Female and male */}
              <div className="row mb-3">
              <label className="col-lg-4">Gender</label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    className="form-check-input"
                    checked={state.gender === "male" ? true : false}
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                  <label htmlFor="male" >
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    className="form-check-input"
                    checked={state.gender === "female" ? true : false}
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                  />
                  <label htmlFor="female" className="form-check-inline mb-1">
                    Female
                  </label>
                </div>
                <div className="text-danger">
                  {dirty["gender"] && errors["gender"][0]
                    ? errors["gender"]
                    : ""}
                </div>
              </div>
            </div>

             

              <p className="text-red-900 mt-2">
                {dirty["gender"] && errors["gender"][0] ? errors["gender"] : ""}
              </p>

              {/* Country */}
              <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                  <label htmlFor="country" className="">
                    Country
                  </label>
                  <select
                    className="block w-full mt-2 px-3 py-1.5 text-base  text-gray-700  bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="country"
                    aria-label="Default select example"
                    value={state.country}
                    name={"country"}
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                    onBlur={(e) => {
                      setDirty({ ...dirty, [e.target.name]: true });
                      validate();
                    }}
                  >
                    <option value={""}>Select Your Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.countryName}>
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-900 mt-2">
                    {dirty["country"] && errors["country"][0]
                      ? errors["country"]
                      : ""}
                  </p>
                </div>
              </div>

              {/* News Letters */}
              <div className="flex justify-center items-center">
                <label
                  htmlFor="receiveNewsLetter"
                  className="dark:text-gray-300"
                >
                  News Letters
                </label>
                <input
                  type="checkbox"
                  name="receiveNewsLetter"
                  id="receiveNewsLetter"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  checked={state.receiveNewsLetter === true ? true : false}
                  value={"true"}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.checked })
                  }
                  onBlur={(e) => {
                    setDirty({ ...dirty, [e.target.name]: true });
                    validate();
                  }}
                />
              </div>

              {/* Footer of the Login */}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded  bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                type="submit"
                className="w-full hover:bg-slate-900 hover:text-white duration-300 border dark:border-white dark:hover:bg-white dark:hover:text-slate-900 border-slate-900 dark:text-white dark:bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={(e) => onRegisterClick(e)}
              >
                Sign Up
              </button>
              <div>{message}</div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account please{" "}
                <Link
                  to={"/"}
                  className="font-semibold text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
