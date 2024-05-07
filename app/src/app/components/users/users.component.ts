import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

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
      this.loadUsers();
    });
  }
  updateUser(id:number): void {
    
    const foundUser= this.userService.findOneUser(id).subscribe(() => {
      console.log(foundUser);
      
    })
    // if (this.selectedUser) {
    //   this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
    //     this.loadUsers();
    //     this.selectedUser = null;
    //   });
    // }
  }
}
