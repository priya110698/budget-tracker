import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-add-budget',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.scss'
})
export class AddBudgetComponent {
  form: FormGroup; // Declare a FormGroup property

  constructor(private fb: FormBuilder) {
    // Initialize the form controls
    this.form = fb.group({
      expense: ['', Validators.required],
      expenseDate: [new Date(), [Validators.required]]
    });

    // this.form.controls['expenseDate'].setValue();
    this.form.controls['expenseDate'].patchValue(this.formatDate(new Date()));
  }

  submitForm() {
    console.log("this.form", this.form.controls);
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
