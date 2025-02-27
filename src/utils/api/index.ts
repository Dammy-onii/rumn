import axios from "axios";
import { loginForm, registerForm } from "../types";
import api from "./Interceptor";

const baseUrl = import.meta.env.VITE_BASE_URL;

const registerUser = async (exampleUserData: registerForm) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/createuser`,

      exampleUserData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const resendMyOtp = async (email: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/resend-otp
`,

      { email }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const verityOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.put(
      `${baseUrl}/user/verifyemail`,

      { email, otp }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ email, password }: loginForm) => {
  try {
    const response = await axios.post(`${baseUrl}/user/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const userPayment = async (user_id: string) => {
  try {
    const response = await axios.post(`${baseUrl}/transaction/initialize`, {
      user_id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async () => {
  try {
    const response = await api.get(`${baseUrl}/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser, verityOTP, resendMyOtp, userPayment, getUserDetails };
