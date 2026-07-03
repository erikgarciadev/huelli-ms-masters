import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionTokenDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  session_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  refresh_token_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  ip_address?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  user_agent?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  started_at?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  expires_at?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  closed_at?: string;

}
