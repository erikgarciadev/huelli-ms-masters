import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ShelterProfileUseCase } from '../../application/use-cases/ShelterProfile.use-case';
import { ShelterProfileTypeOrmRepository } from '../persistence/ShelterProfile.typeorm.repository';
import { CreateShelterProfileDto } from '../../dto/create-ShelterProfile.dto';
import { UpdateShelterProfileDto } from '../../dto/update-ShelterProfile.dto';

@ApiTags('shelter-profiles')
@Controller('shelter-profiles')
export class ShelterProfileController {
  private readonly useCase: ShelterProfileUseCase;

  constructor(private readonly repo: ShelterProfileTypeOrmRepository) {
    this.useCase = new ShelterProfileUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar shelter_profiles' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener shelter_profiles por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear shelter_profiles' })
  create(@Body() dto: CreateShelterProfileDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar shelter_profiles' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateShelterProfileDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar shelter_profiles' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
