import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRescuerProfileDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiPropertyOptional({ maxLength: 30 })
  @IsOptional() @IsString() @MaxLength(30)
  whatsapp?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  rescued_pets?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt()
  year_started?: number;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  verification_status_id!: string;

}
