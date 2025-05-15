import { Module } from '@nestjs/common';
import { ApostasController } from './apostas.controller';
import { ApostasService } from './apostas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aposta } from './entities/aposta.entity';
import { Corrida } from '../corridas/entities/corrida.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Aposta, Corrida, Usuario])
  ],
  controllers: [ApostasController],
  providers: [ApostasService]
})
export class ApostasModule {}
