import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Promocao } from "./entities/promocao.entity";

@Injectable()
export class PromocoesService {
  constructor(
    @InjectRepository(Promocao)
    private promoRepo: Repository<Promocao>,
  ) {}

  criarPromo(data: { titulo: string; taxaPremio: number; expiraEm: Date }) {
    const novaPromo = this.promoRepo.create({
      ...data,
      ativa: true,
    });
    return this.promoRepo.save(novaPromo);
  }

  listarAtivas() {
    return this.promoRepo.find({ where: { ativa: true } });
  }

  async ativarOuDesativar(id: number, ativa: boolean) {
    await this.promoRepo.update(id, { ativa });
    return { sucesso: true };
  }
}
