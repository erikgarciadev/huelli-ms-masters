import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLoginAuditDto {
  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  user_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  provider_id?: string;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsOptional() @IsString() @MaxLength(255)
  login_identifier?: string;

  @ApiProperty()
  @IsBoolean()
  success!: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  ip_address?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional() @IsString() @MaxLength(100)
  city?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  user_agent?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  error_message?: string;

}
