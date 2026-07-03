import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TokenBlacklistUseCase } from '../../application/use-cases/TokenBlacklist.use-case';
import { TokenBlacklistTypeOrmRepository } from '../persistence/TokenBlacklist.typeorm.repository';
import { CreateTokenBlacklistDto } from '../../dto/create-TokenBlacklist.dto';
import { UpdateTokenBlacklistDto } from '../../dto/update-TokenBlacklist.dto';

@ApiTags('token-blacklist')
@Controller('token-blacklists')
export class TokenBlacklistController {
  private readonly useCase: TokenBlacklistUseCase;

  constructor(private readonly repo: TokenBlacklistTypeOrmRepository) {
    this.useCase = new TokenBlacklistUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar token_blacklist' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener token_blacklist por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear token_blacklist' })
  create(@Body() dto: CreateTokenBlacklistDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar token_blacklist' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTokenBlacklistDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar token_blacklist' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
