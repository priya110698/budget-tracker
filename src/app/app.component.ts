import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddBudgetComponent } from './components/add-budget/add-budget.component';
import { ListBudgetComponent } from './components/list-budget/list-budget.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, AddBudgetComponent, ListBudgetComponent, MatTabsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  link = "Add Expenses";
  list = "Expense List";
  title = 'budget-tracker';
  links = ["Add Expenses", "Expense List"];
  activeLink = this.links[0];
  constructor(public httpClient: HttpClient, public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getData().subscribe((updatedData: any) => {
      if (updatedData) {
        this.activeLink = "Add Expenses";
      }
    });
  }

  tab() {
   this.link = "Expense List";
  }
}
