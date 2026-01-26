import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'Senha atual precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha atual não pode estar vazia' })
  currentPassword: string;

  @IsString({ message: 'Nova senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Nova senha não pode estar vazia' })
  @MinLength(6, { message: 'Nova senha precisa ter no mínimo 6 caracteres' })
  newPassword: string;
}
