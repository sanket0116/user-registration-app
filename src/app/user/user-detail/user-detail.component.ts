import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: number | undefined;
  user: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.getUserDetailsById(this.userId);
    });
  }

  getUserDetailsById(userId: number): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.user = users.find((user: any) => user.id === userId);
  }
}
