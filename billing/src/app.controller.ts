import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    console.log({ data });
    this.appService.handleOrderCreated(data);
  }
}
