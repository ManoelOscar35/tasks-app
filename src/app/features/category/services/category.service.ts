import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;

  private readonly httpClient = inject(HttpClient);

  private readonly categories$ = this.httpClient.get<Category[]>(
    `${this.apiUrl}/categories`
  );

  public categories = toSignal(this.categories$, {
    initialValue: [] as Category[],
  }); //signal<Category[]>([]);

  // public getCategories(): Observable<Category[]> {
  //   return this.httpClient
  //     .get<Category[]>(`${this.apiUrl}/categories`)
  //     .pipe(tap(categories => this.categories.set(categories)));
  // }
}
