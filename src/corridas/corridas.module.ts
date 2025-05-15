import { Module } from '@nestjs/common';
import { CorridasController } from './corridas.controller';
import { CorridasService } from './corridas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Corrida } from './entities/corrida.entity';
import { Aposta } from 'src/apostas/entities/aposta.entity';
import { Promocao } from 'src/promocoes/entities/promocao.entity';
import { Usuario } from 'src/usuarios/usuario.entity';

@Module({
   imports: [
    TypeOrmModule.forFeature([Corrida, Aposta, Promocao, Usuario]),
  ],
  controllers: [CorridasController],
  providers: [CorridasService]
})
export class CorridasModule {}
