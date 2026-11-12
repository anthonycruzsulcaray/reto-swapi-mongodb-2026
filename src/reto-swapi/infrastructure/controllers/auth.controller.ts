import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../../application/service/auth.service';
import { JoiValidationPipe } from '../utils/validation/joi/joi-validation.pipe';
import { LoginValidation, RegisterValidation } from '../validation/auth.validation';
import { LoginRequest, RegisterRequest } from '../../domain/entities/user-auth';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(201)
    register(@Body(new JoiValidationPipe(RegisterValidation)) body: RegisterRequest) {
        return this.authService.register(body.name, body.email, body.password);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body(new JoiValidationPipe(LoginValidation)) body: LoginRequest) {
        return this.authService.login(body.email, body.password);
    }
}
