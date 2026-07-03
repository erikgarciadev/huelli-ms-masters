import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfilePhoneDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_profile_id!: string;

  @ApiPropertyOptional({ maxLength: 30 })
  @IsOptional() @IsString() @MaxLength(30)
  phone_type?: string;

  @ApiPropertyOptional({ maxLength: 5 })
  @IsOptional() @IsString() @MaxLength(5)
  country_code?: string;

  @ApiProperty({ maxLength: 30 })
  @IsNotEmpty() @IsString() @MaxLength(30)
  phone_number!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_primary?: boolean;

}
