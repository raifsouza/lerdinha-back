// src/apostas/entities/aposta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Corrida } from '../../../corridas/entities/corrida.entity/corrida.entity';
import { Usuario } from '../../../usuarios/usuario.entity';

@Entity()
export class Aposta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.apostas)
  usuario: Usuario;

  @ManyToOne(() => Corrida, corrida => corrida.apostas)
  corrida: Corrida;

  @Column()
  tartaruga: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  premio: number;

  @Column({ default: false })
  vencedora: boolean;
  
}
