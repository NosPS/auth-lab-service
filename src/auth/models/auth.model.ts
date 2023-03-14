class AuthModel<T> {
    message: string;
    result: T;

    constructor(message: string, result: T) {
        this.message = message;
        this.result = result;
    }
};
export default AuthModel;
