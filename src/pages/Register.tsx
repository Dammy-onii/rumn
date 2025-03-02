import { useState } from "react";
import { CustomInput, SelectInput } from "../components/customComponents/Index";
import { Formik } from "formik";
import { studentValidation } from "../utils/validation";
import { registerUser } from "../utils/api";
import { registerForm } from "../utils/types";
import { NavLink, useNavigate } from "react-router";
import GallerySlider from "../components/gallerySlider/GallerySlider";
import { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";

function Register() {
  const [registerDetails, setregisterDetails] = useState<registerForm>();
  const [uploading, setUploading] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);

  const categoryOptions = [
    { name: "External", amount: 70000 },
    { name: "Internal", amount: 25000 },
  ];

  let navigate = useNavigate();

  const uploadImageToCloudinary = async (file: File, setFieldValue: any) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rumnuploads"); 

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dqul1bz0e/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.secure_url) {
        setFieldValue("image", data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const onRegistration = async () => {
    setLoading(true);
    try {
      const response = registerDetails && (await registerUser(registerDetails));

      console.log(response.data);
      console.log(response);
      toast("User Registered");
      toast.success(
        "User Registered, Check your mail for an OTP. Remember to check your spam"
      );
      toast.success(response.message);
      setTimeout(() => {
        navigate("/otp");
      }, 5000);

      setLoading(false);

      console.log(response.data.message);
      toast.error(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response.data.success);
          console.log(error);
          toast.error("Registration Failed");
          toast.error(error.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" w-full h-screen flex flex-row  ">
      <ToastContainer />
      <div className=" hidden md:w-2/4 lg:w-2/4 md:flex flex-col items-center bg-pink-50  ">
        <GallerySlider />
      </div>
      <div className=" defaultNoise w-full md:w-2/4 px-5 lg:px-10  flex flex-col items-center justify-center ">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            gender: "",
            phoneNumber: "",
            dob: "",
            affiliatedInstitution: "",
            category: {
              name: "",
              amount: 0,
            },
            shirtSize: "",
            additionalInfo: "",
            image: "",
          }}
          validationSchema={studentValidation}
          onSubmit={(values) => {
            // console.log(values);
            setregisterDetails(values);
            console.log("Formmmmmm", registerDetails);
            registerDetails &&
              sessionStorage.setItem("email", registerDetails?.email);
            onRegistration();
          }}
        >
          {({
            values,
            handleBlur,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              className=" w-full lg:w-[90%] overflow-y-scroll m-auto h-[90%] lg:h-3/4 flex flex-col items-center gap-1 py-10 gradientBackground px-5 rounded-md"
            >
              <h2 className=" text-3xl font-medium my-2 ">Registration</h2>
              <CustomInput
                title="Full Name"
                icon="person"
                placeholder="Full Name"
                inputType="text"
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                error={errors.fullName}
              />

              <CustomInput
                title="Email"
                icon="email"
                placeholder="Your Email"
                inputType="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
              />
              <CustomInput
                title="Password"
                icon="mail_lock"
                placeholder="Password"
                inputType="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={errors.password}
              />
              <CustomInput
                title="Phone Number"
                icon="mail_lock"
                placeholder="Phone Number"
                inputType="text"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={errors.phoneNumber}
              />
              <div className=" w-full grid grid-cols-2 gap-5 items-center justify-between ">
                <SelectInput
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  icon="wc"
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  setFieldValue={setFieldValue}
                  error={errors.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div className="w-full flex flex-col my-1">
                  <h2 className="font-light">Date of Birth</h2>
                  <div className="w-full flex flex-row border-2 border-gray-400 items-center px-1 py-1 rounded-xl hover:border-yellow-500 active:border-yellow-500">
                    <span className="material-symbols-outlined font-extralight px-2 border-r-2 border-gray-600">
                      calendar_today
                    </span>
                    <input
                      type="date"
                      name="dob"
                      value={values.dob || ""} // Ensure an empty string is set when value is null/undefined
                      onChange={(e) => {
                        const dateValue = e.target.value; // Get the raw date value

                        if (dateValue) {
                          // Only update state if a valid date is selected
                          setFieldValue("dob", dateValue); // Store the date directly in YYYY-MM-DD format
                        } else {
                          setFieldValue("dob", ""); // Reset the field when empty
                        }
                      }}
                      onBlur={handleBlur}
                      className="outline-none bg-inherit rounded px-2 py-[5px] w-full"
                    />
                  </div>
                  {errors.dob && (
                    <h3 className="text-xs text-[red]">{errors.dob}</h3>
                  )}
                </div>
              </div>
              <CustomInput
                title="Institution"
                icon="mail_lock"
                placeholder="Affiliated Institution"
                inputType="text"
                name="affiliatedInstitution"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.affiliatedInstitution}
                error={errors.affiliatedInstitution}
              />

              <div className="w-full flex flex-col my-1">
                <h2 className="font-light">Category</h2>
                <div className="w-full flex flex-row border-2 border-gray-400 items-center px-1 py-1 rounded-xl hover:border-yellow-500 active:border-yellow-500">
                  <span className="material-symbols-outlined font-extralight px-2 border-r-2 border-gray-600">
                    category
                  </span>
                  <select
                    name="category"
                    value={values.category.name}
                    onChange={(e) => {
                      const selectedCategory = categoryOptions.find(
                        (cat) => cat.name === e.target.value
                      );
                      setFieldValue("category", selectedCategory); // Updates name and amount
                    }}
                    onBlur={handleBlur}
                    className="outline-none bg-inherit rounded px-2 py-[5px] w-full"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name} - ₦{option.amount}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <h3 className="text-xs text-[red]">{errors.category.name}</h3>
                )}
              </div>

              <SelectInput
                name="shirtSize"
                label="Shirt Size"
                value={values.shirtSize}
                icon="checkroom"
                options={[
                  { label: "L", value: "L" },
                  { label: "XL", value: "XL" },
                  { label: "XXL", value: "XXL" },
                ]}
                error={errors.shirtSize}
                onChange={handleChange}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <CustomInput
                title="Additional Info"
                icon="mail_lock"
                placeholder="Additional Info"
                inputType="text"
                name="additionalInfo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.additionalInfo}
                error={errors.additionalInfo}
              />

              <div className="w-full flex flex-col my-1">
                <h2 className="font-light">Upload Picture</h2>
                <label className="flex items-center gap-2 cursor-pointer bg-gray-200 py-2 px-3 rounded-lg">
                  <span className="material-symbols-outlined">
                    cloud_upload
                  </span>
                  <span className="text-sm">Choose a file</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        uploadImageToCloudinary(
                          e.target.files[0],
                          setFieldValue
                        );
                      }
                    }}
                  />
                </label>
                {uploading && (
                  <p className="text-blue-500 text-sm mt-1">Uploading...</p>
                )}
                {values.image && (
                  <img
                    src={values.image}
                    alt="Uploaded"
                    className="mt-2 w-20 h-20 rounded-full object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !values.image}
                className={`mt-4 px-4 py-2 rounded w-3/4 lg:w-1/4 ${
                  isLoading || !values.image
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                {isLoading ? (
                  <CircularProgress size={20} style={{ color: "white" }} />
                ) : (
                  <h2 className="text-base font-medium">Submit</h2>
                )}
              </button>

              <h2 className=" text-sm font-light tracking-wide flex flex-col lg:flex-row items-center gap-2 ">
                Already have an account?{" "}
                <span className=" text-blue-500 font-medium text-lg ">
                  <NavLink to="/"> Login Here </NavLink>
                </span>{" "}
              </h2>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
