import { GlobalConstants } from './GLOBAL-VARIABLES';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
} from '@angular/core';
import { HostListener } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ActionsComponent } from './actions/actions.component';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner/spinner.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userprofile = null;
  options: ['Mohit Bhole', 'Dummy User'];
  filteredOptions$: Observable<string[]>;
  tempusername = 'Mohit Bhole';
  componentRef = null;
  componentRef2 = null;
  title = 'Mohit Bhole';
  theme = '';
  screenheight = 0;
  screenwidth = 0;
  loading = true;

  @ViewChild('menucontainer', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  @ViewChild('actionscontainer', { read: ViewContainerRef })
  entry2!: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver,
    private cdf: ChangeDetectorRef,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}
  @ViewChild('autoInput') input;
  ngOnInit(): void {
    this.options = ['Mohit Bhole', 'Dummy User'];
    this.filteredOptions$ = of(this.options);
  }

  ngAfterViewInit() {
    this.createActionComponent();
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenheight = window.innerHeight;
    this.screenwidth = window.innerWidth;
    if (this.screenheight / this.screenwidth > 1.02) {
      if (!this.componentRef) {
        this.componentRef2.destroy();
        this.componentRef2 = null;
        this.createComponent();
      }
    } else {
      if (this.componentRef) {
        this.componentRef.destroy();
        this.createActionComponent();
        this.componentRef = null;
      }
    }
    //console.log(this.screenheight/this.screenwidth); //1.02
  }

  setUserName() {
    GlobalConstants.username = this.tempusername;
    this.spinnerService.requestStarted();
    console.log(GlobalConstants.username);
    this.cdf.detectChanges();
    this.router.navigateByUrl('/contact', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    this.spinnerService.requestCompleted();
  }); 
  }

  createComponent(): void {
    const factory = this.resolver.resolveComponentFactory(MenuComponent);
    this.componentRef = this.entry.createComponent(factory);
  }

  createActionComponent(): void {
    const factory = this.resolver.resolveComponentFactory(ActionsComponent);
    this.componentRef2 = this.entry2.createComponent(factory);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
    this.tempusername = this.input.nativeElement.value;
    console.log(this.tempusername);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
    this.tempusername = this.input.nativeElement.value;
    console.log(this.tempusername);
  }
}
