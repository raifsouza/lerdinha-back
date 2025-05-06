import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService,  

  @InjectRepository(Usuario)
  private readonly usuarioRepo: Repository<Usuario>
  ) {}

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
    const usuario = await this.usuarioRepo.findOne({ where: { id: userId } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    
    usuario.chavePix = chavePix;
    await this.usuarioRepo.save(usuario);
    return { message: 'Chave PIX atualizada com sucesso' };
  }
  
  @Get(':id/painel')
  async getPainel(@Param('id') id: string) {
  return this.usuariosService.getPainelCompleto(+id);
  }

  @Get('saldo')
  async obterSaldoEHistorico(@Query('usuarioId') usuarioId: number) {
  const usuario = await this.usuarioRepo.findOne({
    where: { id: usuarioId },
    relations: ['apostas', 'apostas.corrida'],
  });

  if (!usuario) throw new NotFoundException('Usuário não encontrado');

  return {
    nome: usuario.nomeCompleto,
    saldo: usuario.saldo,
    apostas: usuario.apostas.map(a => ({
      corridaId: a.corrida.id,
      tartaruga: a.tartaruga,
      valor: a.valor,
      premio: a.premio ?? null,
    })),
  };
}




}
