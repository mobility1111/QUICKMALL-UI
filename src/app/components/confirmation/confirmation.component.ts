// src/app/confirmation/confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'] // Link to your CSS file
})
export class ConfirmationComponent implements OnInit  {

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const token = params['token'];

      if (email && token) {
        this.auth.confirmEmailToken(email, token).subscribe({
          next: (res) =>{
            this.router.navigate(['login']);
          },
          error: (err) => {
            console.log(err);
          }
        })
      }  
    });
  }
}