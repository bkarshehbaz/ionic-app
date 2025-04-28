// export let CodeMessages = {
export const Success = {
    code: 100,
    success: true,
    message: "Success"
};
export const AuthenticationFailed = {
    code: 200,
    success: false,
    message: "Authentication Failed"
};
export const UserAlreadySignedIn = {
    code: 300,
    success: false,
    message: "You are already signed in another device."
};
export const SomethingWentWrong = {
    code: 500,
    success: false,
    message: "Something went wrong!"
};
// };
export const AuthenticationFailedUserNotFound = {
    code: 400,
    success: false,
    message: "Authentication Failed: User Not Found"
};


