interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    isLoggedIn: boolean;
}

export default IUser;
