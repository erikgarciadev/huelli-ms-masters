import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProfileFavoriteDistrictUseCase } from '../../application/use-cases/ProfileFavoriteDistrict.use-case';
import { ProfileFavoriteDistrictTypeOrmRepository } from '../persistence/ProfileFavoriteDistrict.typeorm.repository';
import { CreateProfileFavoriteDistrictDto } from '../../dto/create-ProfileFavoriteDistrict.dto';
import { UpdateProfileFavoriteDistrictDto } from '../../dto/update-ProfileFavoriteDistrict.dto';

@ApiTags('profile-favorite-districts')
@Controller('profile-favorite-districts')
export class ProfileFavoriteDistrictController {
  private readonly useCase: ProfileFavoriteDistrictUseCase;

  constructor(private readonly repo: ProfileFavoriteDistrictTypeOrmRepository) {
    this.useCase = new ProfileFavoriteDistrictUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar profile_favorite_districts' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener profile_favorite_districts por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear profile_favorite_districts' })
  create(@Body() dto: CreateProfileFavoriteDistrictDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar profile_favorite_districts' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProfileFavoriteDistrictDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar profile_favorite_districts' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
