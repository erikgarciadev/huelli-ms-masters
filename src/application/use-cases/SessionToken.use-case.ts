import { SessionToken } from '../../domain/entities/SessionToken.entity';
import { SessionTokenRepository } from '../../domain/repositories/SessionToken.repository';

export class SessionTokenUseCase {
  constructor(private readonly repo: SessionTokenRepository) {}

  findAll(): Promise<SessionToken[]> { return this.repo.findAll(); }
  findById(id: string): Promise<SessionToken | null> { return this.repo.findById(id); }
  create(data: Partial<SessionToken>): Promise<SessionToken> { return this.repo.save(data); }
  update(id: string, data: Partial<SessionToken>): Promise<SessionToken> {
    return this.repo.save({ ...data, id: id });
  }
  remove(id: string): Promise<void> { return this.repo.delete(id); }
}
