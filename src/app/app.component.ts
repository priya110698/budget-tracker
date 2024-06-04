import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import { ListBudgetComponent } from './components/list-budget/list-budget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, AddBudgetComponent, ListBudgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor(public httpClient: HttpClient) {}
  title = 'budget-tracker';
}
