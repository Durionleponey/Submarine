import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async login(username: string, password: string) {}
}
