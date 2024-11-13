import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly httpClient = inject(HttpClient);

  public tasks = signal<Task[]>([]);

  public numberOfTasks = computed(() => this.tasks().length);

  private readonly apiUrl = environment.apiUrl;

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks => {
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public createTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  public insertATaskInTheTasksList(newTask: Task): void {
    const updatedTasks = [...this.tasks(), newTask];
    const sortedTasks = this.getSortedTasks(updatedTasks);
    this.tasks.set(sortedTasks);
  }

  public updateTask(updatedTask: Task): Observable<Task> {
    return this.httpClient.put<Task>(
      `${this.apiUrl}/tasks/${updatedTask.id}`,
      updatedTask
    );
  }

  public updateIsCompletedStatus(
    taskId: string,
    isCompleted: boolean
  ): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, {
      isCompleted,
    });
  }

  public updateATaskInTheTasksList(updatedTask: Task): void {
    this.tasks.update((tasks: Task[]) => {
      const alltasksWithUpdatedTaskRemoved = tasks.filter(
        task => task.id != updatedTask.id
      );

      const updatedTaskList = [...alltasksWithUpdatedTaskRemoved, updatedTask];
      return this.getSortedTasks(updatedTaskList);
    });
  }

  public deleteTask(taskId: string): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.apiUrl}/tasks/${taskId}`);
  }

  public deleteATaskInTheTasksList(taskId: string): void {
    this.tasks.update(tasks => tasks.filter(task => task.id != taskId));
  }

  public getSortedTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  }
}
