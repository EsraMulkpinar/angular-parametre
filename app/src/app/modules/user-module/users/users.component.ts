import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = {} as User;
  displayEditDialog: boolean = false;
  roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
      
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Refresh the list after deletion
    });
  }

  showEditUserDialog(user: User): void {
    this.selectedUser = { ...user };
    this.displayEditDialog = true;
    console.log(this.selectedUser);
    
  }

  updateUser(id: number): void {
    this.userService.updateUser(id, this.selectedUser).subscribe(() => {
      this.loadUsers(); 
      console.log(this.selectedUser);
      
      this.displayEditDialog = false;
    });
  }
}
