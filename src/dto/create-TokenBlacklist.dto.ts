import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTokenBlacklistDto {
  @ApiProperty({ maxLength: 255 })
  @IsNotEmpty() @IsString() @MaxLength(255)
  jwt_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_id!: string;

  @ApiPropertyOptional({ maxLength: 200 })
  @IsOptional() @IsString() @MaxLength(200)
  reason?: string;

  @ApiProperty()
  @IsNotEmpty() @IsDateString()
  expires_at!: string;

}
