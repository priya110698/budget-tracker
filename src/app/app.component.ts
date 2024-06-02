import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, AddBudgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  values: any;
  constructor(public httpClient: HttpClient) {
    this.getValues();
  }
  title = 'budget-tracker';

  getValues() {
    this.httpClient.get("http://localhost:8080/getStudents").subscribe((data: any) => {
      this.values = data;
      // console.log("values", this.values);
    });
  }
}
