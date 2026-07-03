import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProfileFollowerUseCase } from '../../application/use-cases/ProfileFollower.use-case';
import { ProfileFollowerTypeOrmRepository } from '../persistence/ProfileFollower.typeorm.repository';
import { CreateProfileFollowerDto } from '../../dto/create-ProfileFollower.dto';
import { UpdateProfileFollowerDto } from '../../dto/update-ProfileFollower.dto';

@ApiTags('profile-followers')
@Controller('profile-followers')
export class ProfileFollowerController {
  private readonly useCase: ProfileFollowerUseCase;

  constructor(private readonly repo: ProfileFollowerTypeOrmRepository) {
    this.useCase = new ProfileFollowerUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar profile_followers' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener profile_followers por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear profile_followers' })
  create(@Body() dto: CreateProfileFollowerDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar profile_followers' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProfileFollowerDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar profile_followers' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
