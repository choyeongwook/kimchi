import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/entity/cats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async findCatByEmail(email: string): Promise<Cat | null> {
    try {
      const result = await this.catRepository.findOneBy({ email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async findCatByName(name: string): Promise<Cat | null> {
    try {
      const result = await this.catRepository.findOneBy({ name });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async createCat(cat) {
    try {
      const result = await this.catRepository.save(cat);
      const response = {
        message: 'Signup success',
        email: result.email,
        name: result.name,
      };
      return response;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }
}
