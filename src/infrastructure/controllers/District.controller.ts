import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DistrictUseCase } from '../../application/use-cases/District.use-case';
import { DistrictTypeOrmRepository } from '../persistence/District.typeorm.repository';
import { CreateDistrictDto } from '../../dto/create-District.dto';
import { UpdateDistrictDto } from '../../dto/update-District.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('districts')
@Controller('districts')
export class DistrictController {
  private readonly useCase: DistrictUseCase;

  constructor(private readonly repo: DistrictTypeOrmRepository) {
    this.useCase = new DistrictUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar districts' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener districts por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear districts' })
  create(@Body() dto: CreateDistrictDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar districts' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDistrictDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar districts' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
