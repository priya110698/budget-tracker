import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-list-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-budget.component.html',
  styleUrl: './list-budget.component.scss'
})
export class ListBudgetComponent {
  values: any;
  @Output() updateData = new EventEmitter<any>();
  constructor(public httpClient: HttpClient, public commonService: CommonService) {
    this.getValues();
  }
  
  getValues() {
    this.httpClient.get("http://localhost:8080/getStudents").subscribe((data: any) => {
      this.values = data;
    });
  }

  deleteExpense(data: any) {
    this.httpClient.delete(`http://localhost:8080/delete/${data.id}`).subscribe((data: any) => {
      this.getValues();
    });
  }

  updateExpense(data: any) {
    this.commonService.updateData(data);
  }
}
