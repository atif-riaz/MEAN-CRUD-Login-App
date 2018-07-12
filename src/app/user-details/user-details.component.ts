import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {

  user = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
  	this.getUserDetails(this.route.snapshot.params['id']);
  }

  getUserDetails(id) {
    this.http.get('/user/'+id).subscribe(data => {
      this.user = data;
    });
  }

  	deleteUser(id) {
	  this.http.delete('/user/'+id)
	    .subscribe(res => {
	        this.router.navigate(['/']);
	      }, (err) => {
	        console.log(err);
	      }
	    );
	}

}
