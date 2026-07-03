import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PasswordResetTokenUseCase } from '../../application/use-cases/PasswordResetToken.use-case';
import { PasswordResetTokenTypeOrmRepository } from '../persistence/PasswordResetToken.typeorm.repository';
import { CreatePasswordResetTokenDto } from '../../dto/create-PasswordResetToken.dto';
import { UpdatePasswordResetTokenDto } from '../../dto/update-PasswordResetToken.dto';

@ApiTags('password-reset-tokens')
@Controller('password-reset-tokens')
export class PasswordResetTokenController {
  private readonly useCase: PasswordResetTokenUseCase;

  constructor(private readonly repo: PasswordResetTokenTypeOrmRepository) {
    this.useCase = new PasswordResetTokenUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar password_reset_tokens' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener password_reset_tokens por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear password_reset_tokens' })
  create(@Body() dto: CreatePasswordResetTokenDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar password_reset_tokens' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePasswordResetTokenDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar password_reset_tokens' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
