import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RefreshTokenUseCase } from '../../application/use-cases/RefreshToken.use-case';
import { RefreshTokenTypeOrmRepository } from '../persistence/RefreshToken.typeorm.repository';
import { CreateRefreshTokenDto } from '../../dto/create-RefreshToken.dto';
import { UpdateRefreshTokenDto } from '../../dto/update-RefreshToken.dto';

@ApiTags('refresh-tokens')
@Controller('refresh-tokens')
export class RefreshTokenController {
  private readonly useCase: RefreshTokenUseCase;

  constructor(private readonly repo: RefreshTokenTypeOrmRepository) {
    this.useCase = new RefreshTokenUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar refresh_tokens' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener refresh_tokens por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear refresh_tokens' })
  create(@Body() dto: CreateRefreshTokenDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar refresh_tokens' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRefreshTokenDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar refresh_tokens' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
