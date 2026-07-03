import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileFollowerDto {
  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  follower_profile_id!: string;

  @ApiProperty()
  @IsNotEmpty() @IsUUID()
  followed_profile_id!: string;

}
