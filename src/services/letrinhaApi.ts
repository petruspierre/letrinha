import axios from "axios";

const letrinhaApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LETRINHA_API_BASE_URL,
});

export { letrinhaApi };
