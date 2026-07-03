import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserUseCase } from '../../application/use-cases/User.use-case';
import { UserTypeOrmRepository } from '../persistence/User.typeorm.repository';
import { CreateUserDto } from '../../dto/create-User.dto';
import { UpdateUserDto } from '../../dto/update-User.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly useCase: UserUseCase;

  constructor(private readonly repo: UserTypeOrmRepository) {
    this.useCase = new UserUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar users' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener users por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear users' })
  create(@Body() dto: CreateUserDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar users' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar (soft delete) users' })
  @ApiParam({ name: 'id', type: String })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.softDelete(id);
  }
}
