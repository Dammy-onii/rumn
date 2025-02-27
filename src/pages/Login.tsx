import { useState } from "react";
import { CustomInput } from "../components/customComponents/Index";
import { Formik } from "formik";
import { loginValidation } from "../utils/validation";
import { loginUser, userPayment } from "../utils/api";
import {
  getUserID,
  saveUserDetails,
  saveUserID,
  saveUserToken,
} from "../utils/api/userDetails";
import { NavLink, useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import GallerySlider from "../components/gallerySlider/GallerySlider";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { loginForm } from "../utils/types";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onLogin = async (values: loginForm) => {
    // e.preventDefault();
    console.log("Loginn Try");
    setLoading(true);
    try {
      const response = await loginUser(values);
      console.log(response);

      // saveUserDetails(response.token);
      setLoading(false);

      saveUserID(response.data._id);
      saveUserToken(response.data.token);

      console.log(response.data.token);

      toast("Login Successful");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        if (error.response) {
          error.response.data.data &&
            saveUserID(error.response.data.data.user_id);
          saveUserDetails(values.email);
          const userID = getUserID();

          console.log(error.message);
          toast.error(error.response.data.message);

          if (error.response.data.message == "Email not Verified, otp sent") {
            toast.error("Account not verified");
            setTimeout(() => {
              navigate("/otp");
            }, 6000);
          }

          if (
            error.response.data.message ==
            "Account not verified, proceed to payment"
          ) {
            toast.error("Proceed to Payment");
            try {
              const response = userID && (await userPayment(userID));
              console.log(response);
              setTimeout(() => {
                window.open(response.paymentLink);
              }, 6000);
            } catch (error) {
              console.log(error);
            }
            setTimeout(() => {
              // navigate("/otp");
            }, 6000);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-screen flex flex-row  ">
      <ToastContainer />

      <div className=" defaultNoise w-full md:w-2/4  overflow-y-scroll flex flex-col  items-center justify-center ">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidation}
          onSubmit={(values) => {
            // console.log(values);
            onLogin(values);
          }}
        >
          {({ values, handleBlur, errors, handleChange, handleSubmit }) => (
            <form
              action=""
              onSubmit={handleSubmit}
              className=" w-[90%] md:w-3/4 m-auto h-3/4 flex flex-col items-center justify-center px-10 py-2 rounded-xl gradientBackground "
            >
              <h2 className=" text-xl lg:text-4xl font-medium my-2 ">Login</h2>
              <h2 className=" text-lg lg:text-xl font-semibold ">
                Model National Assembly (MNA)
              </h2>
              <h2 className=" text-sm font-light tracking-wide flex flex-row items-center gap-2 ">
                Don't have an account yet?{" "}
                <span className=" text-blue-500 font-medium text-lg ">
                  <NavLink to="/register"> Register Here </NavLink>
                </span>{" "}
              </h2>
              <CustomInput
                title="Email"
                icon="mail"
                placeholder="Email"
                inputType="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
              />
              <CustomInput
                title="Password "
                icon="lock"
                placeholder="Password"
                inputType="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password}
              />
              <button
                type="submit"
                className=" w-3/4 lg:w-1/4 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} style={{ color: "white" }} />
                ) : (
                  <h2 className=" text-base font-medium ">Login</h2>
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>

      <div className=" hidden md:w-2/4 lg:w-2/4 md:flex flex-col items-center bg-pink-50 ">
        <GallerySlider />
      </div>
    </div>
  );
}

export default Login;
