import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-add-budget',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.scss'
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
      console.log("ffdata", updatedData);
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


  insertData() {
    let ctrls = this.form.controls;
    if (ctrls['id'].value) {
      this.httpClient.put(`http://localhost:8080/update/${ctrls['id'].value}?name=${ctrls['expense'].value}&amount=${ctrls['expenseAmnt'].value}&date=${ctrls['expenseDate'].value}`, {}).subscribe((data: any) => {
        console.log("datavalues", data);
        this.form.reset();
        this.listData();
      });
      return;
    }

    let data = {
      "name": ctrls['expense'].value,
      "amount": ctrls['expenseAmnt'].value,
      "date": ctrls['expenseDate'].value
    };
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
