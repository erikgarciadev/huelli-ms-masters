import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({ maxLength: 2 })
  @IsNotEmpty() @IsString() @MaxLength(2)
  iso2!: string;

  @ApiPropertyOptional({ maxLength: 3 })
  @IsOptional() @IsString() @MaxLength(3)
  iso3?: string;

  @ApiPropertyOptional({ maxLength: 5 })
  @IsOptional() @IsString() @MaxLength(5)
  numeric_code?: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_active?: boolean;

}
