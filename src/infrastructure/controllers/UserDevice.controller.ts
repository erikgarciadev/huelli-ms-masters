import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDeviceUseCase } from '../../application/use-cases/UserDevice.use-case';
import { UserDeviceTypeOrmRepository } from '../persistence/UserDevice.typeorm.repository';
import { CreateUserDeviceDto } from '../../dto/create-UserDevice.dto';
import { UpdateUserDeviceDto } from '../../dto/update-UserDevice.dto';

@ApiTags('user-devices')
@Controller('user-devices')
export class UserDeviceController {
  private readonly useCase: UserDeviceUseCase;

  constructor(private readonly repo: UserDeviceTypeOrmRepository) {
    this.useCase = new UserDeviceUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar user_devices' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener user_devices por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear user_devices' })
  create(@Body() dto: CreateUserDeviceDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar user_devices' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDeviceDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar user_devices' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
