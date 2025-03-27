import axios from "axios";
import { BRAIN_BOOST_SERVER_URL } from "../config/remote-server";

const serverApi = axios.create({
    baseURL: BRAIN_BOOST_SERVER_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default serverApi;
