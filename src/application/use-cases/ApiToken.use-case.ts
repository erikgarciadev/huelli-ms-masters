import { ApiToken } from '../../domain/entities/ApiToken.entity';
import { ApiTokenRepository } from '../../domain/repositories/ApiToken.repository';

export class ApiTokenUseCase {
  constructor(private readonly repo: ApiTokenRepository) {}

  findAll(): Promise<ApiToken[]> { return this.repo.findAll(); }
  findById(id: string): Promise<ApiToken | null> { return this.repo.findById(id); }
  create(data: Partial<ApiToken>): Promise<ApiToken> { return this.repo.save(data); }
  update(id: string, data: Partial<ApiToken>): Promise<ApiToken> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
