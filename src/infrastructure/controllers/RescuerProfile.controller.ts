import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RescuerProfileUseCase } from '../../application/use-cases/RescuerProfile.use-case';
import { RescuerProfileTypeOrmRepository } from '../persistence/RescuerProfile.typeorm.repository';
import { CreateRescuerProfileDto } from '../../dto/create-RescuerProfile.dto';
import { UpdateRescuerProfileDto } from '../../dto/update-RescuerProfile.dto';

@ApiTags('rescuer-profiles')
@Controller('rescuer-profiles')
export class RescuerProfileController {
  private readonly useCase: RescuerProfileUseCase;

  constructor(private readonly repo: RescuerProfileTypeOrmRepository) {
    this.useCase = new RescuerProfileUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar rescuer_profiles' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener rescuer_profiles por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear rescuer_profiles' })
  create(@Body() dto: CreateRescuerProfileDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar rescuer_profiles' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRescuerProfileDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar rescuer_profiles' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
