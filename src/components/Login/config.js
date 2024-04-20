export const getConfig = () => {
    return {
        validUsername: process.env.REACT_APP_USERNAME,
        validPassword: process.env.REACT_APP_PASSWORD,
    };
};