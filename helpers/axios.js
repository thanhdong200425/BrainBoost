import axios from "axios";
import { BRAIN_BOOST_SERVER_URL } from "../config/remote-server";

const serverApi = axios.create({
    baseURL: BRAIN_BOOST_SERVER_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default serverApi;
