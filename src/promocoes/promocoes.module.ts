import { Module } from '@nestjs/common';
import { PromocoesService } from './promocoes.service';
import { PromocoesController } from './promocoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocao } from './entities/promocao.entity';
console.log('Controller:', PromocoesController);
@Module({
   imports: [
    TypeOrmModule.forFeature([Promocao])
  ],
  providers: [PromocoesService],
  controllers: [PromocoesController]
})
export class PromocoesModule {}
