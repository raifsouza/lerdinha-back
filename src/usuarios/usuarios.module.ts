import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { ApostasModule } from '../apostas/apostas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]),
  forwardRef(() => ApostasModule),],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
