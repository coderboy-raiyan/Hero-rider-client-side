import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";
import Header from "./../Home/Header/Header";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { signIn, user, setUser, setError } = useAuth();
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setError("");
  }, []);

  useEffect(() => {
    if (checked) {
      setUser({});
    }
  }, [user, checked]);

  useEffect(() => {
    fetch(`https://afternoon-coast-04252.herokuapp.com/find/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.isBlocked) {
          setChecked(data?.isBlocked);
        }
      });
  }, [user]);

  const onSubmit = (data) => {
    // check password
    if (data.password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
    }

    signIn(data.email, data.password, location, history);
  };
  return (
    <>
      <Header />

      <div>
        <div className="bg-gray-100 bg-no-repeat bg-cover bg-center">
          <div className="lg:max-w-6xl lg:mx-auto max-w-3xl mx-4 ">
            <div className="flex justify-center items-center h-screen flex-col">
              <div className="w-40 mb-5">
                <h1 className="text-2xl text-center text-black font-semibold">
                  Please Login
                </h1>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white lg:w-2/5 md:w-2/5 w-full px-4 py-8 rounded shadow-lg"
              >
                <div className="flex flex-col space-y-6 mb-4">
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    required
                    {...register("email")}
                  />
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Password"
                    required
                    {...register("password")}
                  />
                  <button className="primary-btn rounded py-3 block text-lg hover:border-2 border-2">
                    Login
                  </button>
                </div>

                <p className="text-center">
                  Don't have account{" "}
                  <Link className="text-gray-400" to="/register">
                    register
                  </Link>{" "}
                  here
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
