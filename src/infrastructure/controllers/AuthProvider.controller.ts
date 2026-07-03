import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthProviderUseCase } from '../../application/use-cases/AuthProvider.use-case';
import { AuthProviderTypeOrmRepository } from '../persistence/AuthProvider.typeorm.repository';
import { CreateAuthProviderDto } from '../../dto/create-AuthProvider.dto';
import { UpdateAuthProviderDto } from '../../dto/update-AuthProvider.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('auth-providers')
@Controller('auth-providers')
export class AuthProviderController {
  private readonly useCase: AuthProviderUseCase;

  constructor(private readonly repo: AuthProviderTypeOrmRepository) {
    this.useCase = new AuthProviderUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar auth_providers' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener auth_providers por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear auth_providers' })
  create(@Body() dto: CreateAuthProviderDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar auth_providers' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAuthProviderDto) {
    return this.useCase.update(id, dto as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar auth_providers' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
