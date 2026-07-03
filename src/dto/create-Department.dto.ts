import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  country_id!: string;

  @ApiPropertyOptional({ maxLength: 20 })
  @IsOptional() @IsString() @MaxLength(20)
  code?: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_active?: boolean;

}
