import { Module } from '@nestjs/common';
import { ApostasController } from './apostas.controller';
import { ApostasService } from './apostas.service';

@Module({
  controllers: [ApostasController],
  providers: [ApostasService]
})
export class ApostasModule {}
