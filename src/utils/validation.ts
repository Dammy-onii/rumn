import * as yup from "yup";

export const studentValidation = yup.object().shape({
  fullName: yup.string().required("Fullname is Required"),
  email: yup.string().email().required("Required"),
  password: yup.string().min(6).required("Required"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
  dob: yup.string().required("Required"),
  affiliatedInstitution: yup.string().required("Required"),
  category: yup.object().shape({
    name: yup.string().required("Required"),
    amount: yup.number().required("Required"),
  }),
  shirtSize: yup.string().required("Required"),
  additionalInfo: yup.string().required("Required"),
  image: yup.string().required("Required"),
});

export const loginValidation = yup.object().shape({
  email: yup.string().required("Required"),

  password: yup.string().required("Required"),
});

export const otpValidation = yup.object().shape({
  email: yup.string().required("Required"),
  otp: yup.string().required("Required"),
});
