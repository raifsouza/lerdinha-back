import { Aposta } from '../apostas/entities/aposta.entity/aposta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  saldo: number;

  @Column()
  telefone: string;

  @Column({ nullable: true })
  chavePix: string;

  @Column()
  senha: string;

  @OneToMany(() => Aposta, aposta => aposta.usuario)
  apostas: Aposta[];

}
