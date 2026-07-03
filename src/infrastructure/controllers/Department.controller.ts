import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DepartmentUseCase } from '../../application/use-cases/Department.use-case';
import { DepartmentTypeOrmRepository } from '../persistence/Department.typeorm.repository';
import { CreateDepartmentDto } from '../../dto/create-Department.dto';
import { UpdateDepartmentDto } from '../../dto/update-Department.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('departments')
@Controller('departments')
export class DepartmentController {
  private readonly useCase: DepartmentUseCase;

  constructor(private readonly repo: DepartmentTypeOrmRepository) {
    this.useCase = new DepartmentUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar departments' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener departments por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear departments' })
  create(@Body() dto: CreateDepartmentDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar departments' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDepartmentDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar departments' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
