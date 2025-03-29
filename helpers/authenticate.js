import serverApi from "./axios";

export const signUp = async (email, password, confirmPassword) => {
    try {
        const response = await serverApi.post("/auth/sign-up", {
            email,
            password,
            confirmPassword,
        });

        console.log("Signup successful:", response.data);
        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        // Network error handling
        if (error.message === "Network Error") {
            console.error("Network error - unable to connect to server");
            throw new Error("Network Error: Unable to connect to server");
        }

        // Handle API errors with response
        if (error.response) {
            console.error(
                "API error in signUp():",
                error.response.data?.message || error.response.statusText
            );
            return {
                status: false,
                error: error.response.data?.message || "Server error occurred",
            };
        }

        // Handle other errors
        console.error("Error in signUp():", error.message || error);
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

        console.log("Login successful");
        return {
            status: true,
            data: response.data,
        };
    } catch (error) {
        // Network error handling
        if (error.message === "Network Error") {
            console.error("Network error - unable to connect to server");
            throw new Error("Network Error: Unable to connect to server");
        }

        // Handle API errors with response
        if (error.response) {
            console.error(
                "API error in signIn():",
                error.response.data?.message || error.response.statusText
            );
            return {
                status: false,
                error: error.response.data?.message || "Login failed",
            };
        }

        // Handle other errors
        console.error("Error in signIn():", error.message || error);
        return {
            status: false,
            error: "An unexpected error occurred. Please try again later.",
        };
    }
};
