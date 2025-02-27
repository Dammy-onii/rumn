export interface registerForm {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  phoneNumber: string;
  dob: string;
  affiliatedInstitution: string;
  category: {
    name: string;
    amount: number;
  };
  shirtSize: string;
  additionalInfo: string;
  image: string;
}

export interface OTPForm {
  email: string;
  otp: string;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface currentPosition {
  id: number;
  name: string;
}

export interface currentCandidate {
  id: number;
  profile_picture: string;
  fullname: string;
}

export interface chartValue {
  profile_picture: string;
  vote_count: number;
}

export interface chartData {
  position: string;
  value: chartValue;
  candidates: string;
}
