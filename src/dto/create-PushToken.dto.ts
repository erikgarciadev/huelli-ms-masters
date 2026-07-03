import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePushTokenDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_device_id!: string;

  @ApiProperty({ maxLength: 30 })
  @IsNotEmpty() @IsString() @MaxLength(30)
  provider!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  token!: string;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  is_active?: boolean;

}
