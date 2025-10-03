import axios from "axios";

const api = axios.create({
  baseURL: "https://citypulse-backend-git-main-aditisjoshi2005-gmailcoms-projects.vercel.app", 
  withCredentials: true, // ✅ allow sending cookies/credentials
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
