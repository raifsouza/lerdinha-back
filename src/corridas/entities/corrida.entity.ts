// src/corridas/entities/corrida.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Aposta } from '../../apostas/entities/aposta.entity';

@Entity()
export class Corrida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  finalizada: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @OneToMany(() => Aposta, aposta => aposta.corrida, { cascade: true })
  apostas: Aposta[];

  @Column({ nullable: true })
  tartarugaVencedora: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0.7 })
  taxaPremio: number;

}