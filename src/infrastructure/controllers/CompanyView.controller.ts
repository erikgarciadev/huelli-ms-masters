import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyViewUseCase } from '../../application/use-cases/CompanyView.use-case';
import { CompanyViewTypeOrmRepository } from '../persistence/CompanyView.typeorm.repository';

@ApiTags('vw-companies')
@Controller('views/companies')
export class CompanyViewController {
  private readonly useCase: CompanyViewUseCase;

  constructor(private readonly repo: CompanyViewTypeOrmRepository) {
    this.useCase = new CompanyViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_companies' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_companies por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
