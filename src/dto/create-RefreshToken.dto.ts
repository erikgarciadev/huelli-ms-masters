import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  token_hash!: string;

  @ApiProperty()
  @IsNotEmpty() @IsDateString()
  expires_at!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  revoked_at?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  ip_address?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  user_agent?: string;

}
