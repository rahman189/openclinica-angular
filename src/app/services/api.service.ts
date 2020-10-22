import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string) {
		return this.http.get<any>(`${environment.apiUrl}${url}`)
		.pipe(
			map(data => {
        return data
      }));
  }
  
}
