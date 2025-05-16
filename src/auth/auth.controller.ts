import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usuariosService: UsuariosService,) {}

 @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const usuario = await this.usuariosService.findByEmail(body.email);

    if (!usuario || usuario.senha !== body.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.authService.generateToken(usuario);
    return {
      access_token: token,
      user: {
        id: usuario.id,
        nome: usuario.nomeCompleto,
        email: usuario.email,
      }
    };
  }
}
