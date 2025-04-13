// Arquivo de comunicação com o app.module.ts

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
