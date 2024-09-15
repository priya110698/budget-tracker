import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonService } from '../../common.service';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-list-budget',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatInputModule, MatIconModule, MatDatepickerModule, MatGridListModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, provideNativeDateAdapter()],
  templateUrl: './list-budget.component.html',
  styleUrl: './list-budget.component.scss'
})

export class ListBudgetComponent {
  values: any;
  @Output() updateData = new EventEmitter<any>();
  totExpense: any;
  expenseDate: any;
  fromDate: any;
  toDate: any;

  displayedColumns: string[] = ['name', 'date', 'action', 'amount'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(public httpClient: HttpClient, public commonService: CommonService) {
    this.getExpenseList();
  }

  dateChanging() {
    this.dataSource.data = this.dataSource.data.filter((expenseDate: any) => expenseDate.date === this.commonService.formatDate(this.expenseDate));
    this.totExpense = this.dataSource.data.reduce((acc: any, data: any) => {
      return acc + data.amount;
    }, 0);
  }

  getExpenseList() {
    this.commonService.getBudgetlist().subscribe((data: any) => {
      this.dataSource.data = data;
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
        this.httpClient.delete(`http://localhost:8080/delete/${data.id}`).subscribe(() => {
          this.getExpenseList();
        });
      } else
        Swal.fire(' Cancelled', '', 'error')
    });
  }

  updateExpense(data: any) {
    this.commonService.updateData(data);
  }

  formatDate(date: string | number | Date) {
    const d = new Date(date);
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  resetDate() {
    // this.expenseDate = new Date();
    this.getExpenseList();
    this.expenseDate = '';
    this.fromDate = '';
    this.toDate = '';
  }

  filterFromToData() {
    if (this.fromDate && this.toDate) {
      console.log(this.dataSource.data);
      console.log(this.toDate);
      this.dataSource.data = this.dataSource.data.filter((expense: any) => expense.date >= this.commonService.formatDate(this.fromDate) && expense.date <= this.commonService.formatDate(this.toDate));
      this.totExpense = this.dataSource.data.reduce((acc: any, data: any) => { return acc + data.amount }, 0);
    }
  }

}
