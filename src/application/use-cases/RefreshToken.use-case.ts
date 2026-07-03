import { RefreshToken } from '../../domain/entities/RefreshToken.entity';
import { RefreshTokenRepository } from '../../domain/repositories/RefreshToken.repository';

export class RefreshTokenUseCase {
  constructor(private readonly repo: RefreshTokenRepository) {}

  findAll(): Promise<RefreshToken[]> { return this.repo.findAll(); }
  findById(id: string): Promise<RefreshToken | null> { return this.repo.findById(id); }
  create(data: Partial<RefreshToken>): Promise<RefreshToken> { return this.repo.save(data); }
  update(id: string, data: Partial<RefreshToken>): Promise<RefreshToken> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
