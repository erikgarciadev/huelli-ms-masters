import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserStatusUseCase } from '../../application/use-cases/UserStatus.use-case';
import { UserStatusTypeOrmRepository } from '../persistence/UserStatus.typeorm.repository';
import { CreateUserStatusDto } from '../../dto/create-UserStatus.dto';
import { UpdateUserStatusDto } from '../../dto/update-UserStatus.dto';

@ApiTags('user-status')
@Controller('user-statuses')
export class UserStatusController {
  private readonly useCase: UserStatusUseCase;

  constructor(private readonly repo: UserStatusTypeOrmRepository) {
    this.useCase = new UserStatusUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar user_status' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener user_status por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear user_status' })
  create(@Body() dto: CreateUserStatusDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar user_status' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserStatusDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar user_status' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
