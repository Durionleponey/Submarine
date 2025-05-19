import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CurrentUser } from "./current-user.decorator";
import { User } from "../users/entities/user.entity";
import { Response } from "express";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(
<<<<<<< Updated upstream
        @CurrentUser()user:User,
        @Res({ passthrough: true }) response: Response,
        ) {
        return this.authService.login(user, response);
    }
=======
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response,//res is the current reponds
    ) {
        console.log("®️", response); console.log("🧑‍🏭", user)
        return this.authService.login(user, response);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.logout(response);
    }
>>>>>>> Stashed changes
}
