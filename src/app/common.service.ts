import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  data = new BehaviorSubject(null);
  data$ = this.data.asObservable();
  constructor(public httpClient: HttpClient) {

  }

  updateData(data: any) {
    this.data.next(data);
  }

  getData() {
    return this.data$;
  }

  getBudgetlist() {
    return this.httpClient.get("http://localhost:8080/getStudents");
  }

  geTotExpense() {
    return this.httpClient.get("http://localhost:8080/getTotalExpense");
  }

}
