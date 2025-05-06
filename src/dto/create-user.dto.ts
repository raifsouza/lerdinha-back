import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nomeCompleto: string;

  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  telefone: string;

  @MinLength(6)
  senha: string;
}
