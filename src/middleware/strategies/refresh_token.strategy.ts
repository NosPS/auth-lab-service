import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

type JwtPayload = {
    sub: string;
    username: string;
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "rt-secret",
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: JwtPayload) {
        const refresh_token = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refresh_token
        };
    }
}