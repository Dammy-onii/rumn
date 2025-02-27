export const saveUserDetails = (email: string): void => {
  if (typeof window !== "undefined") {
    try {
      console.log("Sessioonn", email);
      sessionStorage.setItem("email", email);
    } catch (error) {
      console.error("Error saving user details to localStorage:", error);
    }
  }
};

export const saveUserID = (id: string): void => {
  if (typeof window !== "undefined") {
    try {
      console.log("Sessioonn", id);
      sessionStorage.setItem("id", id);
    } catch (error) {
      console.error("Error saving user details to localStorage:", error);
    }
  }
};

export const saveUserToken = (token: string): void => {
  if (typeof window !== "undefined") {
    try {
      console.log("Sessioonn", token);
      sessionStorage.setItem("token", token);
    } catch (error) {
      console.error("Error saving user details to localStorage:", error);
    }
  }
};

export const getUserDetails = () => {
  if (typeof window !== "undefined") {
    try {
      const jsonData = sessionStorage.getItem("email");
      console.log("JsonDataaa", jsonData);
      return jsonData ? jsonData : null;
    } catch (error) {
      console.error("Error retrieving user details from localStorage:", error);
      return null;
    }
  }
};

export const getUserID = () => {
  if (typeof window !== "undefined") {
    try {
      const userID = sessionStorage.getItem("id");
      console.log("JsonDataaa", userID);
      return userID ? userID : null;
    } catch (error) {
      console.error("Error retrieving user details from localStorage:", error);
      return null;
    }
  }
};

export const getUserToken = () => {
  if (typeof window !== "undefined") {
    try {
      const token = sessionStorage.getItem("token");
      console.log("JsonDataaa", token);
      return token ? token : null;
    } catch (error) {
      console.error("Error retrieving user details from localStorage:", error);
      return null;
    }
  }
};

export const clearUserToken = () => {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("token", "token");
    } catch (error) {
      console.error("Error retrieving user details from localStorage:", error);
      return null;
    }
  }
};

