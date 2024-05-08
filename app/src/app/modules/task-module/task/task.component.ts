// src/app/components/tasks/tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../model/task.model';
import { CreateTask } from '../model/create-task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TasksComponent implements OnInit {
  showDialog = false;
  taskName: string = '';
  selectedTask: Task = {} as Task;

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('Failed to load tasks', err)
    });
  }
  editTask(task: Task) {
    // Set selected task and open the dialog for editing
    this.selectedTask = task;
    this.showDialog = true;
  }
  updateTask(task: Task): void {
    this.taskService.updateTask(task.id, task).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Failed to update task', err)
    });
  }

  addTask() {
    const newTask: CreateTask = {
      name: this.taskName
    };

    this.taskService.createTask(newTask).subscribe(() => {
      console.log('Task created successfully');
      this.showDialog = false;
    });
    window.location.reload()
  }

  removeTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Failed to delete task', err)
    });
  }

  assignTaskToUser(userId: number, taskId: number): void {
    this.taskService.assignTask(userId, taskId).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Failed to assign task', err)
    });
  }
}
