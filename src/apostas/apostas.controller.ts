import { Controller, Post, Body } from '@nestjs/common';
import { ApostasService } from './apostas.service';

@Controller('apostas')
export class ApostasController {
  constructor(private readonly apostasService: ApostasService) {}

 @Post()
async criarAposta(
  @Body() data: { corridaId: number; userId: number; valor: number; tartaruga: string },
) {
  const { corridaId, userId, valor, tartaruga } = data;
  return this.apostasService.criarAposta(corridaId, userId, tartaruga);
}

}
