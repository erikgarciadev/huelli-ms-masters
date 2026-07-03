import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PushTokenUseCase } from '../../application/use-cases/PushToken.use-case';
import { PushTokenTypeOrmRepository } from '../persistence/PushToken.typeorm.repository';
import { CreatePushTokenDto } from '../../dto/create-PushToken.dto';
import { UpdatePushTokenDto } from '../../dto/update-PushToken.dto';
import { SetActiveDto } from '../../dto/set-active.dto';

@ApiTags('push-tokens')
@Controller('push-tokens')
export class PushTokenController {
  private readonly useCase: PushTokenUseCase;

  constructor(private readonly repo: PushTokenTypeOrmRepository) {
    this.useCase = new PushTokenUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar push_tokens' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener push_tokens por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear push_tokens' })
  create(@Body() dto: CreatePushTokenDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar push_tokens' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePushTokenDto) {
    return this.useCase.update(id, { ...dto, updated_at: new Date() } as any);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Activar/desactivar push_tokens' })
  @ApiParam({ name: 'id', type: String })
  setActive(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetActiveDto) {
    return this.useCase.setActive(id, dto.is_active === 1);
  }
}
