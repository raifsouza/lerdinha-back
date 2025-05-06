// src/apostas/apostas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aposta } from '../apostas/entities/aposta.entity/aposta.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Corrida } from '../corridas/entities/corrida.entity/corrida.entity';

@Injectable()
export class ApostasService {
  constructor(
    @InjectRepository(Aposta)
    private apostaRepo: Repository<Aposta>,

    @InjectRepository(Corrida)
    private corridaRepo: Repository<Corrida>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async criarAposta(userId: number, corridaId: number, tartaruga: string) {
    const usuario = await this.usuarioRepo.findOneBy({ id: userId });
    const corrida = await this.corridaRepo.findOneBy({ id: corridaId });
  
    if (!usuario || !corrida) {
      throw new Error('Usuário ou corrida não encontrado');
    }
  
    const valorAposta = 10.0;
  
    // Verifica saldo
    if (usuario.saldo < valorAposta) {
      throw new Error('Saldo insuficiente');
    }
  
    // Desconta o valor
    usuario.saldo -= valorAposta;
    await this.usuarioRepo.save(usuario);
  
    const aposta = this.apostaRepo.create({
      usuario,
      corrida,
      tartaruga,
      valor: valorAposta,
    });
  
    return this.apostaRepo.save(aposta);
  }
  
  
}
