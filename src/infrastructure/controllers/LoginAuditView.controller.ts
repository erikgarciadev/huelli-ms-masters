import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginAuditViewUseCase } from '../../application/use-cases/LoginAuditView.use-case';
import { LoginAuditViewTypeOrmRepository } from '../persistence/LoginAuditView.typeorm.repository';

@ApiTags('vw-login-audit')
@Controller('views/login-audits')
export class LoginAuditViewController {
  private readonly useCase: LoginAuditViewUseCase;

  constructor(private readonly repo: LoginAuditViewTypeOrmRepository) {
    this.useCase = new LoginAuditViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_login_audit' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_login_audit por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
