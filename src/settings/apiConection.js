import axios from "axios";

const apiCS = axios.create({
    baseURL:"http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
})
apiCS.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
       window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
export default apiCS