import { PartialType } from '@nestjs/swagger';
import { CreateUserDeviceDto } from './create-UserDevice.dto';

export class UpdateUserDeviceDto extends PartialType(CreateUserDeviceDto) {}
