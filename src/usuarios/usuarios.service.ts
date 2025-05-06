import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async criar(usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosRepository.save(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async getPainelCompleto(userId: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id: userId },
      relations: ['apostas', 'apostas.corrida']
    });
  
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
  
    const apostas = usuario.apostas.map(aposta => ({
      corridaId: aposta.corrida.id,
      tartaruga: aposta.tartaruga,
      vencedora: aposta.corrida.tartarugaVencedora === aposta.tartaruga,
      premio: aposta.premio
    }));
  
    return {
      saldo: usuario.saldo,
      apostas
    };
  }
  
  async resgatarPix(userId: number): Promise<any> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: userId } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    if (usuario.saldo <= 0) throw new BadRequestException('Saldo insuficiente para resgate');
  
    const valorResgatado = usuario.saldo;
    usuario.saldo = 0;
    await this.usuariosRepository.save(usuario);
  
    return {
      mensagem: 'Resgate solicitado com sucesso',
      valor: valorResgatado,
      chavePix: usuario.chavePix || 'não informada',
    };
  }
  
  async atualizarChavePix(userId: number, chavePix: string): Promise<any> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: userId } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
  
    usuario.chavePix = chavePix;
    await this.usuariosRepository.save(usuario);
  
    return { mensagem: 'Chave PIX atualizada com sucesso' };
  }
  
}
