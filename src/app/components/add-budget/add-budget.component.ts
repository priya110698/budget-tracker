import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonService } from '../../common.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-add-budget',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatGridListModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, provideNativeDateAdapter()],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.scss',
})
export class AddBudgetComponent {
  form: FormGroup; // Declare a FormGroup property
  values: any;

  constructor(private fb: FormBuilder, public httpClient: HttpClient, public commonService: CommonService) {
    // Initialize the form controls
    this.form = fb.group({
      id: [''],
      expense: ['', Validators.required],
      expenseDate: [new Date(), [Validators.required]],
      expenseAmnt: ['', Validators.required]
    });

    // this.form.controls['expenseDate'].setValue();
    this.form.controls['expenseDate'].patchValue(this.formatDate(new Date()));
  }

  ngOnInit() {
    this.commonService.getData().subscribe((updatedData: any) => {
      if (updatedData) {
        this.form.setValue({
          id: updatedData.id,
          expense: updatedData.name,
          expenseDate: updatedData.date,
          expenseAmnt: updatedData.amount
        });
      }
    });
  }

  
  // DO Video for Interview Preparation 
  // 1. Add date selection in List screen based on that write query for particular date expense
  // 2. Next Week Date range selection - with in 2 dates have to fetch expense -- fromdate & todate selsction
  // 3. Change delete logic, We never delete any data's
  // 4. Write Encryption / Decryption Logic in FrontEnd & API

  insertData() {
    let ctrls = this.form.controls;
    let data = {
      "name": ctrls['expense'].value,
      "amount": ctrls['expenseAmnt'].value,
      "date": this.formatDate(ctrls['expenseDate'].value)
    };

    if (ctrls['id'].value) {
      this.httpClient.post(`http://localhost:8080/update/${ctrls['id'].value}`, data).subscribe((data: any) => {
        console.log("datavalues", data);
        this.form.reset();
        this.listData();
      });
      return;
    }
    
    this.httpClient.post("http://localhost:8080/insertStudent", data).subscribe((data: any) => {
      console.log("datavalues", data);
      this.form.reset();
      this.listData();
    });
  }

  listData() {
    this.commonService.getBudgetlist().subscribe((data: any) => {
      this.values = data;
    });
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
