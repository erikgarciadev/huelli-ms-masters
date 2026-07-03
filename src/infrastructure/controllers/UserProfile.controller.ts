import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserProfileUseCase } from '../../application/use-cases/UserProfile.use-case';
import { UserProfileTypeOrmRepository } from '../persistence/UserProfile.typeorm.repository';
import { CreateUserProfileDto } from '../../dto/create-UserProfile.dto';
import { UpdateUserProfileDto } from '../../dto/update-UserProfile.dto';

@ApiTags('user-profiles')
@Controller('user-profiles')
export class UserProfileController {
  private readonly useCase: UserProfileUseCase;

  constructor(private readonly repo: UserProfileTypeOrmRepository) {
    this.useCase = new UserProfileUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar user_profiles' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener user_profiles por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear user_profiles' })
  create(@Body() dto: CreateUserProfileDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar user_profiles' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserProfileDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar (soft delete) user_profiles' })
  @ApiParam({ name: 'id', type: String })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.softDelete(id);
  }
}
