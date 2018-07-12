import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  user = {};

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
  }

  loginUser() {
  	this.http.post('/user/login', this.user)
  	  .subscribe(res => {
  	    let resStr = String(res);
  	    let validStr = /valid201/gi;  
  	  	if (resStr.search(validStr) == -1)
  	  	{
          this.alertService.error(resStr);
  	  	}
  	  	else
  	  	{
  	  	  let id = resStr.split("_",2)[1];
  	  	  this.router.navigate(['/user-details', id]);
  	  	}
      }, (err) => {
        console.log(err);
      });
  }

}
