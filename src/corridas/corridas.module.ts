import { Module } from '@nestjs/common';
import { CorridasController } from './corridas.controller';
import { CorridasService } from './corridas.service';

@Module({
  controllers: [CorridasController],
  providers: [CorridasService]
})
export class CorridasModule {}
