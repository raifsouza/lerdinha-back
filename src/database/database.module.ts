import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sua-senha',
      database: 'jogo_lerdinha',
      entities: [Usuario],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
