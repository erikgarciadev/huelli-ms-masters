import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyLocationDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  company_profile_id!: string;

  @ApiPropertyOptional({ maxLength: 150 })
  @IsOptional() @IsString() @MaxLength(150)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  country_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  department_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  district_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsNumber()
  latitude?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsNumber()
  longitude?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_main?: boolean;

}
