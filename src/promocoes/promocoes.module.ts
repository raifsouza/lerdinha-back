import { Module } from '@nestjs/common';
import { PromocoesService } from './promocoes.service';
import { PromocoesController } from './promocoes.controller';

@Module({
  providers: [PromocoesService],
  controllers: [PromocoesController]
})
export class PromocoesModule {}
