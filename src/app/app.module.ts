import { ServerRequests } from './ServerRequests';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbCardModule,
  NbMenuModule,
  NbUserModule,
  NbIconModule,
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbButtonModule,
  NbSpinnerModule,
  NbAutocompleteModule,
  NbInputModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ResumeComponent } from './resume/resume.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { MenuComponent } from './menu/menu.component';
import { ActionsComponent } from './actions/actions.component';
import { SafePipeModule } from 'safe-pipe';
import { ReactportfolioComponent } from './reactportfolio/reactportfolio.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { GithubComponent } from './github/github.component';
import { EmailComponent } from './email/email.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { httpInterceptProvider } from './http_interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    AboutComponent,
    HomeComponent,
    ProjectsComponent,
    MenuComponent,
    ActionsComponent,
    ReactportfolioComponent,
    LinkedinComponent,
    GithubComponent,
    EmailComponent,
    SpinnerComponent,
  ],
  imports: [
    SafePipeModule,
    BrowserModule,
    NbAutocompleteModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'contact', component: AboutComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'alt-portfolio', component: ReactportfolioComponent },
      { path: 'github', component: GithubComponent },
      { path: 'linkedin', component: LinkedinComponent },
      { path: 'email', component: EmailComponent },
    ]),
    NbActionsModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbInputModule,
    NbUserModule,
    NbMenuModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'dark' }),
  ],
  providers: [ServerRequests, httpInterceptProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
