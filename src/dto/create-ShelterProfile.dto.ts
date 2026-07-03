import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShelterProfileDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty({ maxLength: 250 })
  @IsNotEmpty() @IsString() @MaxLength(250)
  shelter_name!: string;

  @ApiPropertyOptional({ maxLength: 30 })
  @IsOptional() @IsString() @MaxLength(30)
  whatsapp?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  pets_capacity?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  foundation_year?: number;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  verification_status_id!: string;

}
