import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IdentityUseCase } from '../../application/use-cases/Identity.use-case';
import { IdentityTypeOrmRepository } from '../persistence/Identity.typeorm.repository';
import { CreateIdentityDto } from '../../dto/create-Identity.dto';
import { UpdateIdentityDto } from '../../dto/update-Identity.dto';

@ApiTags('identities')
@Controller('identities')
export class IdentityController {
  private readonly useCase: IdentityUseCase;

  constructor(private readonly repo: IdentityTypeOrmRepository) {
    this.useCase = new IdentityUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar identities' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener identities por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear identities' })
  create(@Body() dto: CreateIdentityDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar identities' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateIdentityDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar (soft delete) identities' })
  @ApiParam({ name: 'id', type: String })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.softDelete(id);
  }
}
