import { Component } from '@angular/core';
import { CategoryComponent } from '../../features/category/view/category/category.component';

import { MatDividerModule } from '@angular/material/divider';
import { TaskComponent } from '../../features/task/view/task/task.component';

const COMPONENTS = [CategoryComponent, TaskComponent];
const MODULES = [MatDividerModule];

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [...COMPONENTS, ...MODULES],
  template: `
    <div class="h-screen flex w-full border-4 border-blue-700">
      <app-category class="w-1/4 border-2 border-orange-700" />
      <mat-divider class="h-full opacity-50"></mat-divider>
      <app-task class="w-3/4 border-4 border-green-700" />
    </div>
  `,
  styles: ``,
})
export class MainComponent {}
