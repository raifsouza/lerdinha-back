import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './usuarios/usuario.entity';
import { Aposta } from './apostas/entities/aposta.entity'
import { Corrida } from './corridas/entities/corrida.entity';
import { Promocao } from './promocoes/entities/promocao.entity';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'jogo_da_lerdinha',
  synchronize: false,
  logging: true,
  entities: [Usuario, Aposta, Corrida, Promocao],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
