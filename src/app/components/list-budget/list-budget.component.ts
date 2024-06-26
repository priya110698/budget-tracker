import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../common.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-budget',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './list-budget.component.html',
  styleUrl: './list-budget.component.scss'
})
export class ListBudgetComponent {
  values: any;
  @Output() updateData = new EventEmitter<any>();
  totExpense = 0;
  constructor(public httpClient: HttpClient, public commonService: CommonService) {
    this.getValues();
  }

  getValues() {
    this.commonService.getBudgetlist().subscribe((data: any) => {
      this.values = data;
    });

    this.commonService.geTotExpense().subscribe((data: any) => {
      this.totExpense = data;
    });
  }

  deleteExpense(data: any) {
    Swal.fire({
      title: 'Do you want delete it',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpClient.delete(`http://localhost:8080/delete/${data.id}`).subscribe((data: any) => {
          this.getValues();
        });
      } else
        Swal.fire(' Cancelled', '', 'error')
    });
  }

  updateExpense(data: any) {
    this.commonService.updateData(data);
  }
}
