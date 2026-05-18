import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const createBooking = (data) => API.post("/bookings", data);
export const getBookings = () => API.get("/bookings");
export const getMalls = () => API.get("/malls");
export const getCityMalls = (city) => API.get(`/malls/${city}`);
