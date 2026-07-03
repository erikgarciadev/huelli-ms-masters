import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyServiceDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  company_profile_id!: string;

  @ApiProperty({ maxLength: 150 })
  @IsNotEmpty() @IsString() @MaxLength(150)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_active?: boolean;

}
