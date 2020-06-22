import axios from "axios";

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:8081/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 60000
});

export default http;
