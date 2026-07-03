import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyGalleryDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  company_profile_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  image_url!: string;

  @ApiPropertyOptional({ maxLength: 150 })
  @IsOptional() @IsString() @MaxLength(150)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  sort_order?: number;

}
