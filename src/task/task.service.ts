// Aqui é onde crio meus métodos

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  // dados mockados por enquanto
  private tasks: TaskDto[] = [];

  // CREATE - CRIAR
  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  // READ - LER
  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);
    if (foundTask.length) {
      return foundTask[0];
    }
    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  // FIND ALL
  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;
      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }
      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }
      return match;
    });
  }

  // UPDADTE - ATUALIZAR
  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }
    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  // DELETE - DELETAR
  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
