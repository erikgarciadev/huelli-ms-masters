import { Controller, Get, Param, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyLocationViewUseCase } from '../../application/use-cases/CompanyLocationView.use-case';
import { CompanyLocationViewTypeOrmRepository } from '../persistence/CompanyLocationView.typeorm.repository';

@ApiTags('vw-company-locations')
@Controller('views/company-locations')
export class CompanyLocationViewController {
  private readonly useCase: CompanyLocationViewUseCase;

  constructor(private readonly repo: CompanyLocationViewTypeOrmRepository) {
    this.useCase = new CompanyLocationViewUseCase(repo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vw_company_locations' })
  findAll() {
    return this.useCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener vw_company_locations por id' })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.useCase.findById(id);
    if (!result) throw new NotFoundException(`Registro no encontrado: ${id}`);
    return result;
  }
}
