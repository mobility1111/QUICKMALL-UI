
import { Component, OnInit } from '@angular/core';

import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileDto } from 'src/app/models/userprofiledto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile!: UserProfileDto;
  public fullName: string = '';

  constructor(private profileService: ProfileService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }
  
  loadUserProfile(): void {
    const userId = this.authService.getUserIdFromToken();
  
    if (userId) {
      this.profileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          console.log('User profile loaded successfully:', profile);
          this.userProfile = profile;
        },
        error: (error) => {
          console.error('Error loading user profile:', error);
        }
      });
    } else {
      console.warn('User ID is not available.');
    }
  }

  goToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    this.authService.logout();
    this.fullName = '';
  }
}