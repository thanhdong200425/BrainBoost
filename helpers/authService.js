import serverApi from "./axios";

export const signIn = async (email, password) => {
    try {
        const response = await serverApi.post("/auth/signin", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "An error occurred during sign in" };
    }
};
