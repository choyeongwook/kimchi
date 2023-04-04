import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly authService: AuthService,
  ) {}

  getAllCat() {
    return 'adfasdfadsfa';
  }

  getCat(id: number) {
    return 'getcat';
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isEmailExist = await this.catsRepository.findCatByEmail(email);
    const isNameExist = await this.catsRepository.findCatByName(name);

    if (isEmailExist) {
      throw new UnauthorizedException('해당하는 이메일이 이미 존재합니다.');
    }
    if (isNameExist) {
      throw new UnauthorizedException('해당하는 이름이 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await this.catsRepository.createCat({
      email,
      name,
      password: hashedPassword,
    });

    return response;
  }
}
