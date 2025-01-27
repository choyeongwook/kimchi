import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.catsService.getAllCat();
  }
}
