import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('decimal', { precision: 5, scale: 2 })
  taxaPremio: number;

  @Column({ default: false })
  ativa: boolean;

  @CreateDateColumn()
  criadaEm: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiraEm: Date;
}
