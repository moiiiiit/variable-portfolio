import { GlobalConstants } from './../GLOBAL-VARIABLES';
import { ServerRequests } from './../ServerRequests';
import { Component, OnInit } from '@angular/core';
import * as data from 'src/assets/userprofile.json';
import { HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  userprofile = null;
  aspectRatio = 16 / 9;
  isMobile = false;
  resumeurl = '';
  userid = null;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private server: ServerRequests
  ) {
    this.userprofile = data;
    this.resumeurl = this.userprofile.resumeiframesrc;
    this.aspectRatio = window.innerHeight / window.innerWidth;
    if (this.aspectRatio > 1.716) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
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
  getProfileData() {
    this.server.getUserID(GlobalConstants.username).subscribe((data) => {
      this.userid = data;
      this.server.getProfile(this.userid).subscribe((data) => {
        this.userprofile = data;
      });
    });
  }
  ngOnInit(): void {
    this.getProfileData();
  }
}
