import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOauthAuthorizationCodeDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  provider_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  code_hash!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  redirect_uri?: string;

  @ApiProperty()
  @IsNotEmpty() @IsDateString()
  expires_at!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  consumed_at?: string;

}
