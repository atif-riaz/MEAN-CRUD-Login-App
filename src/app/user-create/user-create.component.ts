import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserCreateComponent implements OnInit {

  user = {};

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  saveUser() {
    this.http.post('/user/verify', this.user)
      .subscribe(res => {
          let resStr = String(res);
          let invalidStr = /error501/gi;  
          if (resStr.search(invalidStr) == -1)
          {
            this.http.post('/user', res)
            .subscribe(resp => {
                let id = resp['_id'];
                this.router.navigate(['/user-details', id]);
              }, (err) => {
                console.log(err);
              }
            );
          }
          else
          {
            let error = resStr.split("_",2)[1];
            this.alertService.error(error);
          }
        }, (err) => {
          console.log(err);
        }
      );
  }

}
