import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currency?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ValidateIf((o) => o.repeatPassword !== o.password)
  @IsIn([Math.random()], { message: 'Passwords must match' })
  repeatPassword: string;
}
