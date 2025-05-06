import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PromocoesService } from "./promocoes.service";

@Controller('admin/promocoes')
export class PromocoesController {
  constructor(private readonly promocoesService: PromocoesService) {}

  @Post()
  criar(@Body() data: { titulo: string; taxaPremio: number; expiraEm: Date }) {
    return this.promocoesService.criarPromo(data);
  }

  @Get('ativas')
  listar() {
    return this.promocoesService.listarAtivas();
  }

  @Patch(':id/estado')
  mudarEstado(@Param('id') id: number, @Body() body: { ativa: boolean }) {
    return this.promocoesService.ativarOuDesativar(id, body.ativa);
  }
}
