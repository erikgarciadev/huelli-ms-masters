import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyProfileDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty({ maxLength: 250 })
  @IsNotEmpty() @IsString() @MaxLength(250)
  company_name!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  category_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  verification_status_id!: string;

  @ApiPropertyOptional({ maxLength: 30 })
  @IsOptional() @IsString() @MaxLength(30)
  whatsapp?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  website?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  year_started?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  logo_url?: string;

}
