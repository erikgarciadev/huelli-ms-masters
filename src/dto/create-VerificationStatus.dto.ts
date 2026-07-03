import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVerificationStatusDto {
  @ApiProperty({ maxLength: 30 })
  @IsNotEmpty() @IsString() @MaxLength(30)
  code!: string;

  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty() @IsString() @MaxLength(100)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

}
