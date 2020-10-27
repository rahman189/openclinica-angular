import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string) {
		return this.http.get<any>(`${environment.apiUrl}${url}`)
		.pipe(
			map(response => {
        return response
      }));
  }
  
  post(url: string, data: object) {
		return this.http.post<any>(`${environment.apiUrl}${url}`, data)
		.pipe(
			map(response => {
        return response
      }));
  }
  delete(url: string) {
		return this.http.delete<any>(`${environment.apiUrl}${url}`)
		.pipe(
			map(response => {
        return response
      }));
  }
  put(url: string, data: object) {
		return this.http.put<any>(`${environment.apiUrl}${url}`, data)
		.pipe(
			map(response => {
        return response
      }));
  }
  
}
