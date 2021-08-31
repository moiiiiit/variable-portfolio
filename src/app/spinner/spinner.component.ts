import { SpinnerService } from './spinner.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;
  constructor(
    private spinnerService: SpinnerService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status == 'start';
      this.cdref.detectChanges();
    });
  }
}
