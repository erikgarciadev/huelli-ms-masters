import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfilePreferenceDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_profile_id!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  receive_notifications?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  receive_email?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  receive_marketing?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  share_location?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  dark_mode?: boolean;

  @ApiPropertyOptional({ maxLength: 10 })
  @IsOptional() @IsString() @MaxLength(10)
  language_code?: string;

}
