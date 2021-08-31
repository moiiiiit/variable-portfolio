import { ServerRequests } from './../ServerRequests';
import { Component, OnInit } from '@angular/core';
import { HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  userprofile = null;
  aspectRatio = 16/9;
  userid=null;
  isMobile = false;
  constructor(private changeDetectorRef: ChangeDetectorRef, private server: ServerRequests) {
    this.aspectRatio = window.innerHeight / window.innerWidth;
    if (this.aspectRatio > 1.716) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  getProfileData() {
    this.server.getUserID('Mohit Bhole').subscribe((data) => {
      this.userid = data;
      this.server.getProfile(this.userid).subscribe((data) => {
        this.userprofile = data;
      });
    });
  }
  ngOnInit(): void {
    this.getProfileData();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.aspectRatio = window.innerHeight / window.innerWidth;
    if (this.aspectRatio > 1.716) {
      this.isMobile = true;
      this.changeDetectorRef.detectChanges();
    } else {
      this.isMobile = false;
      this.changeDetectorRef.detectChanges();
    }
  }

}
