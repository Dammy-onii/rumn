import React, { useState, useRef } from "react";

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if available and the current box is filled
    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
