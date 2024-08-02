import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-type": "application/json; charset=UTF-8" },
});
export const instanceComments = axios.create({
  baseURL: process.env.NEXT_PUBLIC_COMMENTS_BASE_URL,
  headers: { "Content-type": "application/json; charset=UTF-8" },
});
