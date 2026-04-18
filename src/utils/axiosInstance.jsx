import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://petikbook.petik.or.id",
});

export default axiosInstance;