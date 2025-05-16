import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CorridasModule } from './corridas/corridas.module';
import { ApostasModule } from './apostas/apostas.module';
import { PromocoesModule } from './promocoes/promocoes.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
 imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
     UsuariosModule,
     CorridasModule,
     ApostasModule,
     PromocoesModule,
  ],
})

export class AppModule {}
