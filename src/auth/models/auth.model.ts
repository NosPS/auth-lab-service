type Props<T> = {
    message: string;
    result: T;
};

class AuthModel<T> {
    message: string;
    result: T;

    constructor({ message, result }: Props<T>) {
        this.message = message;
        this.result = result;
    }
};
export default AuthModel;
