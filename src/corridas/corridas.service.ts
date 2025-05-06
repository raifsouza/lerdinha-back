// src/corridas/corridas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Corrida } from './entities/corrida.entity/corrida.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Aposta } from '../apostas/entities/aposta.entity/aposta.entity';
import { Promocao } from 'src/promocoes/entities/promocao.entity';
import { Usuario } from 'src/usuarios/usuario.entity';

@Injectable()
export class CorridasService {
  constructor(
    @InjectRepository(Corrida)
    private readonly corridaRepo: Repository<Corrida>,
    @InjectRepository(Promocao) 
    private promoRepo: Repository<Promocao>,
    @InjectRepository(Aposta)
    private readonly apostaRepo: Repository<Aposta>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async finalizarCorrida(corridaId: number): Promise<any> {
    const corrida = await this.corridaRepo.findOne({
      where: { id: corridaId },
      relations: ['apostas', 'apostas.usuario'], // adiciona apostas com usuários
    });
  
    if (!corrida) throw new NotFoundException('Corrida não encontrada');
  
    // Sorteia a tartaruga vencedora
    const vencedora = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
    corrida.tartarugaVencedora = vencedora;
  
    // Verifica promoção ativa
    const promo = await this.promoRepo.findOne({
      where: { ativa: true, expiraEm: MoreThanOrEqual(new Date()) },
      order: { expiraEm: 'ASC' },
    });
  
    const taxa = promo ? promo.taxaPremio : 1.0;
  
    // Filtra apostas vencedoras
    const vencedores = corrida.apostas.filter(a => a.tartaruga === vencedora);
    for (const aposta of vencedores) {
      const premio = aposta.valor * taxa;
      aposta.premio = premio;
  
      // Credita o prêmio ao usuário
      aposta.usuario.saldo += premio;
  
      await this.usuarioRepo.save(aposta.usuario);
      await this.apostaRepo.save(aposta);
    }
  
    corrida.finalizada = true;
    await this.corridaRepo.save(corrida);
  
    return {
      vencedora,
      vencedores: vencedores.map(a => ({
        usuarioId: a.usuario.id,
        premio: a.premio,
      })),
      promocaoUsada: promo ? promo.titulo : null,
    };
  }
  
  
  async atualizarCorrida(id: number, dados: Partial<Corrida>) {
    await this.corridaRepo.update(id, dados);
    return this.corridaRepo.findOneBy({ id });
  }

  async criarCorrida() {
    const novaCorrida = this.corridaRepo.create();
    return await this.corridaRepo.save(novaCorrida);
  }
}
