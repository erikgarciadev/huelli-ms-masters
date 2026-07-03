import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApiTokenDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty({ maxLength: 100 })
  @IsNotEmpty() @IsString() @MaxLength(100)
  name!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  token_hash!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  scopes?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  expires_at?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  revoked_at?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  last_used_at?: string;

}
