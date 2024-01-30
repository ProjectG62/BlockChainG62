import axios from "axios";


export const api = axios.create({
  baseURL: "https://cryptoestate-omega.vercel.app/api",
});