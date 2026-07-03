import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleUseCase } from '../../application/use-cases/Role.use-case';
import { RoleTypeOrmRepository } from '../persistence/Role.typeorm.repository';
import { CreateRoleDto } from '../../dto/create-Role.dto';
import { UpdateRoleDto } from '../../dto/update-Role.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  private readonly useCase: RoleUseCase;

  constructor(private readonly repo: RoleTypeOrmRepository) {
    this.useCase = new RoleUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener roles por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear roles' })
  create(@Body() dto: CreateRoleDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar roles' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRoleDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar roles' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
