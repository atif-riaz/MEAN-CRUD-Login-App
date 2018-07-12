import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {

  user = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {
  	this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    this.http.get('/user/'+id).subscribe(data => {
      this.user = data;
    });
  }

  updateUser(id) {
    this.http.post('/user/verifyedit', this.user)
      .subscribe(res => {
          let resStr = String(res);
          let invalidStr = /error/gi;  
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
