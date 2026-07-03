import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthProviderDto {
  @ApiProperty({ maxLength: 30 })
  @IsNotEmpty() @IsString() @MaxLength(30)
  code!: string;

  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty() @IsString() @MaxLength(100)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_active?: boolean;

}
