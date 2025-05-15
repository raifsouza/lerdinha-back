import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro')
  async cadastrar(@Body() dados: Partial<Usuario>) {
    return this.usuariosService.criar(dados);
  }

  @Get()
  async listar() {
    return this.usuariosService.listar();
  }

  @Patch('resgatar-pix')
  @UseGuards(AuthGuard)
  async resgatarPix(@Req() req: any) {
  const userId = req.user.id;
  return this.usuariosService.resgatarPix(userId);
  }

  @Patch('chave-pix')
  @UseGuards(AuthGuard)
  async atualizarChavePix(@Req() req, @Body('chavePix') chavePix: string) {
    const userId = req.user.id;
    const usuario = await this.usuariosService.atualizarChavePix( userId , chavePix);
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
  }
  
  @Get(':id/painel')
  async getPainel(@Param('id') id: string) {
  return this.usuariosService.getPainelCompleto(+id);
  }

  @Get('saldo')
  async obterSaldoEHistorico(@Query('usuarioId') usuarioId: number) {
  const usuario = await this.usuariosService.getPainelCompleto(usuarioId);

  if (!usuario) throw new NotFoundException('Usuário não encontrado');

}




}
