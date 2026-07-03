import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyCategoryDto {
  @ApiProperty({ maxLength: 30 })
  @IsNotEmpty() @IsString() @MaxLength(30)
  code!: string;

  @ApiProperty({ maxLength: 150 })
  @IsNotEmpty() @IsString() @MaxLength(150)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional({ maxLength: 250 })
  @IsOptional() @IsString() @MaxLength(250)
  icon?: string;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsOptional() @IsString() @MaxLength(20)
  color?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  sort_order?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_active?: boolean;

}
