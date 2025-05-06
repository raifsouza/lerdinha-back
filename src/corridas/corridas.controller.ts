// src/corridas/corridas.controller.ts
import { Controller, Param, Patch, Post, Query } from '@nestjs/common';
import { CorridasService } from './corridas.service';

@Controller('corridas')
export class CorridasController {
  constructor(private readonly corridasService: CorridasService) {}

  @Patch(':id/finalizar')
  async finalizar(
    @Param('id') id: string,
  
  ) {
    const corridaId = parseInt(id, 10);

    return this.corridasService.finalizarCorrida(corridaId);
  }
  
  @Post()
  async criarCorrida() {
    return this.corridasService.criarCorrida();
  }

  
}
