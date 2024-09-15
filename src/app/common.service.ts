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

  getDateExpense(expenseDate: any) {
    return this.httpClient.post("http://localhost:8080/getDateExpense", expenseDate);
  }

  formatDate(date: string | number | Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

}
