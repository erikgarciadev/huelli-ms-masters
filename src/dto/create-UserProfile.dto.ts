import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  community_alias?: string;

  @ApiProperty({ maxLength: 150 })
  @IsNotEmpty() @IsString() @MaxLength(150)
  full_name!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  profile_photo_url?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  bio?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  reference_url?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  country_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  department_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  district_id?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_public?: boolean;

}
