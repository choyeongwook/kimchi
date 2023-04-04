import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/entity/cats.entity';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
