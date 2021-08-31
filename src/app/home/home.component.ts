import { GlobalConstants } from './../GLOBAL-VARIABLES';
import { ServerRequests } from './../ServerRequests';
import { Component, OnInit, ViewChild } from '@angular/core';
import Typewriter from 't-writer.js';
import { HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('tw') typewriterElement;
  @ViewChild('tw2') typewriterElement2;
  aspectRatio = 16 / 9;
  isMobile = false;
  userprofile = null;
  userid = null;
  userexperiences = null;
  useridentifiers = null;
  logos = [];
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private server: ServerRequests
  ) {
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

  startTypewriter(): void {
      const target = this.typewriterElement.nativeElement
      const target2 = this.typewriterElement2.nativeElement;
      const writer = new Typewriter(target, {
        typeColor: '#868c9c',
      });
      const writer2 = new Typewriter(target2, {
        typeColor: '#868c9c',
      })
      writer
    .type('')
    .removeCursor()
    .then(writer2.start.bind(writer2))
    .start()
      writer2
        .type(this.useridentifiers[0].identifiername)
        .rest(500)
        .clear()
        .type(this.useridentifiers[1].identifiername)
        .rest(500)
        .clear()
        .type(this.useridentifiers[2].identifiername)
        .rest(500)
        .clear()
        .then(writer.start.bind(writer));
  }

  getProfileData() {
    this.server.getUserID(GlobalConstants.username).subscribe((data) => {
      this.userid = data;
      this.server.getProfile(this.userid).subscribe((data) => {
        this.userprofile = data;
        this.server.getIdentifiers(this.userid).subscribe((data) => {
          this.useridentifiers = data;
          this.server.getExperiences(this.userid).subscribe((data) => {
            this.userexperiences = data;
            this.startTypewriter();
            this.changeDetectorRef.detectChanges();
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.getProfileData();
  }
}
