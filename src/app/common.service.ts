import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  data = new BehaviorSubject(null);
  data$ = this.data.asObservable();
  constructor() {

  }

  updateData(data: any) {
    this.data.next(data);
  }

  getData() {
    return this.data$;
  }
}
