import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileSocialLinkDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  user_profile_id!: string;

  @ApiProperty({ maxLength: 50 })
  @IsNotEmpty() @IsString() @MaxLength(50)
  social_network!: string;

  @ApiProperty()
  @IsNotEmpty() @IsString()
  profile_url!: string;

}
