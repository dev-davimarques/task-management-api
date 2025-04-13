import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  // dados mockados por enquanto
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }
}
