import { Controller, Get, Post, Put, Body, Param, NotFoundException, ParseUUIDPipe, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginAuditUseCase } from '../../application/use-cases/LoginAudit.use-case';
import { LoginAuditTypeOrmRepository } from '../persistence/LoginAudit.typeorm.repository';
import { CreateLoginAuditDto } from '../../dto/create-LoginAudit.dto';
import { UpdateLoginAuditDto } from '../../dto/update-LoginAudit.dto';

@ApiTags('login-audit')
@Controller('login-audits')
export class LoginAuditController {
  private readonly useCase: LoginAuditUseCase;

  constructor(private readonly repo: LoginAuditTypeOrmRepository) {
    this.useCase = new LoginAuditUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar login_audit' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener login_audit por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Crear login_audit' })
  create(@Body() dto: CreateLoginAuditDto) {
    return this.useCase.create(dto as any);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar login_audit' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLoginAuditDto) {
    return this.useCase.update(id, dto as any);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar login_audit' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.useCase.remove(id);
  }
}
