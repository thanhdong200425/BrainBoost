import serverApi from "./axios";
import axios from "axios";

export const signUp = async (email, password, confirmPassword) => {
    try {
        const response = await serverApi.post(
            "/auth/sign-up",
            {
                email,
                password,
                confirmPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        console.log(error);
        console.log("Error in signUp():", error.response?.data || error.response?.message || error);
        return {
            status: false,
            error: error.response?.data?.message || "Sorry! We encoutered some problems!",
        };
    }
};
