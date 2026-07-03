import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIdentityDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  provider_id!: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsOptional() @IsString() @MaxLength(255)
  provider_user_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  login_identifier?: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsOptional() @IsString() @MaxLength(255)
  password_hash?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_primary?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  last_login_at?: string;

}
