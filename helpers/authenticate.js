import serverApi from "./axios";

export const signUp = async (email, password, confirmPassword) => {
    try {
        const response = await serverApi.post("/auth/sign-up", {
            email,
            password,
            confirmPassword,
        });

        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        if (error.message === "Network Error") {
            throw new Error("Network Error: Unable to connect to server");
        }

        if (error.response) {
            return {
                status: false,
                error: error.response.data?.message || "Server error occurred",
            };
        }

        return {
            status: false,
            error: "An unexpected error occurred. Please try again later.",
        };
    }
};

export const signIn = async (email, password) => {
    try {
        const response = await serverApi.post("/auth/sign-in", {
            email,
            password,
        });

        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        if (error.message === "Network Error") {
            throw new Error("Network Error: Unable to connect to server");
        }

        if (error.response) {
            return {
                status: false,
                error: error.response.data?.message || "Login failed",
            };
        }

        return {
            status: false,
            error: "An unexpected error occurred. Please try again later.",
        };
    }
};
