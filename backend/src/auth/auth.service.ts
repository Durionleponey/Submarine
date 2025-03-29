import { Injectable } from '@nestjs/common';
import {User} from "../users/entities/user.entity";
import {ConfigService} from "@nestjs/config";
import {TokenPayload} from "./token-payload.interface";
import {JwtService} from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}
    async login(user: User, response: Response) {
        const expires = new Date()
        expires.setSeconds(
            expires.getSeconds() + this.configService.getOrThrow('JWT_EXPIRATION')
        )

        const tokenPayload: TokenPayload = {
            _id: user._id.toHexString(),
            email: user.email,
        };

        const token = this.jwtService.sign(tokenPayload);
        response.cookie('Authentification',token,{
            httpOnly: true,
            expires: expires
        })


    }

    logout(response: Response) {
        response.cookie('Authentification','',{
            httpOnly: true,
            expires: new Date(),
        })
    }
}
