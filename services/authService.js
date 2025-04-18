import serverApi from '../helpers/axios';

export const signUp = async (email, password, confirmPassword) => {
    try {
        const response = await serverApi.post('/auth/sign-up', {
            email,
            password,
            confirmPassword,
        });

        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(
                error.response.data?.message || 'Server error occurred during sign up.'
            );
        else if (error.request) throw new Error('Network Error: Unable to connect to server.');
        else throw new Error('An unexpected error occurred during sign up.');
    }
};

export const signIn = async (email, password) => {
    try {
        const response = await serverApi.post('/auth/sign-in', {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(
                error.response.data?.message || 'Server error occurred during sign in.'
            );
        else if (error.request) throw new Error('Network Error: Unable to connect to server.');
        else throw new Error('An unexpected error occurred during sign in.');
    }
};
