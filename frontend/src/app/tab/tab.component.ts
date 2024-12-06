import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { User } from './user.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent implements OnInit{
  displayedColumns = ["select", "photo", "nom", "email"]
  users: User[] = [];
  userInfo: {photo: string, name: string, email: string} | null = null;
  dataSource = new MatTableDataSource<User>(this.users);
  selection = new SelectionModel<User>(true, []);

  constructor(){}

  ngOnInit(){
    this.users = [
      {name: "Test", email: "Test", id: 0, photo: "https://img.icons8.com/ios-glyphs/50/user--v1.png"},
      {name: "Test 2", email: "Test 2", id: 1, photo: "https://img.icons8.com/ios-glyphs/50/user--v1.png"},
    ]
    this.dataSource.data = this.users;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const dataStr = `${data.name} ${data.email}`.toLowerCase();
      return dataStr.includes(filter);
    };
  
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  user_lenght(){
    return this.users.length;
  }

  showPopup(){
    return;
  }
}
