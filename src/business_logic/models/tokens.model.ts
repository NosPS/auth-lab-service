type Props = {
    access_token: string;
    refresh_token: string;
};

class TokensModel {
    access_token: string;
    refresh_token: string;

    constructor({ access_token, refresh_token }: Props) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }
};
export default TokensModel;