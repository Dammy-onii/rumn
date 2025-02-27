import { useState } from "react";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import GallerySlider from "../components/gallerySlider/GallerySlider";
import { toast, ToastContainer } from "react-toastify";
import OtpInput from "../components/customComponents/OtpInput";
import { resendMyOtp, verityOTP } from "../utils/api";
import { getUserDetails } from "../utils/api/userDetails";

function OTP() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const saved = getUserDetails();
  console.log(saved);

  const handleOtpComplete = async (enteredOtp: string) => {
    setOTP(enteredOtp); // Update state with entered OTP

    console.log("Entered OTP:", enteredOtp);
    setLoading(true)
    try {
      const response = saved && (await verityOTP(saved, otp));
      console.log(response);
      toast.success("Successful");
      setTimeout(() => {
        setLoading(false)
        navigate("/");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTP = async () => {
    try {
      const response = saved && (await resendMyOtp(saved));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <ToastContainer />

      {/* Left Section (Gallery) */}
      <div className="hidden md:w-2/4 lg:w-2/4 md:flex flex-col items-center bg-pink-50">
        <GallerySlider />
      </div>

      {/* Right Section (OTP Form) */}
      <div className="defaultNoise w-full md:w-2/4 overflow-y-scroll px-10">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Final OTP Submitted:", otp);
          }}
          className="w-[90%] md:w-3/4 m-auto h-full flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl font-medium my-2">Verify OTP</h2>
          <h2 className="text-sm font-light tracking-wide flex flex-row items-center gap-2">
            Didn't get an OTP?{" "}
            <span
              onClick={resendOTP}
              className="text-blue-500 font-medium text-lg cursor-pointer"
            >
              Resend
            </span>
          </h2>

          <OtpInput length={6} onComplete={handleOtpComplete} />

          <button
            type="submit"
            className="w-3/4 lg:w-1/4 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              <h2 className="text-base font-medium">Submit</h2>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTP;
