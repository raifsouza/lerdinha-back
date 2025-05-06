import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CorridasModule } from './corridas/corridas.module';
import { ApostasModule } from './apostas/apostas.module';
import { PromocoesModule } from './promocoes/promocoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuariosModule,
    CorridasModule,
    ApostasModule,
    PromocoesModule,
  ],
})
export class AppModule {}
