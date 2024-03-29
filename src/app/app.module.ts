import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SelectRequiredValidatorDirective } from './Shared/select-required-validator.directive';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { stuQuickAdmission } from './_resolver/stuQuickAdmission.resolver';
import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { AuthGaurd } from './_gaurd/Auth.guard';
import { AuthInterceptor } from './services/AuthServices/Auth.Insecptors';
import { AuthService } from './services/AuthServices/Auth.service';
import { StudentNavigationItem } from './theme/layout/admin/navigation/Studentnavigation'; 
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ChatUserListComponent,
    FriendComponent,
    ChatMsgComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    SelectRequiredValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ScheduleAllModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [NavigationItem, StudentNavigationItem, stuQuickAdmission, AuthGaurd, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
