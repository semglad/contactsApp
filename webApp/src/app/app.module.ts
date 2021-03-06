import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactListItemComponent } from './contact/contact-list/contact-list-item/contact-list-item.component';
import { ContactLocalStorageService} from './contact/services/contact-local-storage.service';
import { MaterialComponentsModule} from './material-components/material-components.module';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AddContactComponent } from './contact/edit-view-contact/edit-view-contact.component';
import { ContactPhonePipe } from './contact/pipes/contact-phone.pipe';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import { LoginComponent } from './login/login/login.component';
import {ContactService} from './contact/services/contact.service';
import {ContactHttpService} from './contact/services/contact-http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginService} from './login/services/login.service';
import {CaHttpInterceptor} from './config/ca-http-interceptor';
import { HttpMessageDialogComponent } from './http-message-dialog/http-message-dialog.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:error',
    component: LoginComponent
  },
  {
    path: 'ca',
    component: AppLayoutComponent,
    children: [
      {
        path: 'edit-view-contact',
        component: AddContactComponent
      },
      {
        path: 'edit-view-contact/:new',
        component: AddContactComponent
      },
      {
        path: 'contacts',
        component: ContactListComponent
      },
      {
        path: 'contacts/:id/:edit',
        component: AddContactComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    AddContactComponent,
    ContactPhonePipe,
    LoginComponent,
    HttpMessageDialogComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ContactLocalStorageService,
    ContactService,
    ContactHttpService,
    LoginService,
    BreakpointObserver,
    MediaMatcher,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CaHttpInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    HttpMessageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
