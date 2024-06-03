
import { AuthModule } from 'angular-auth-oidc-client';
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';
import { NbAccordionModule, NbActionsModule, NbAlertModule, NbAutocompleteModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbPopoverModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbStepperModule, NbThemeModule, NbToggleModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CoreModule } from '../app/@core/core.module';
import { FileUploadService } from '../app/pages/import-processing/emass-import/file-upload.service';
import { SharedModule } from './Shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgParticlesModule } from 'ng-particles';
import { UnauthorizedComponent } from './Shared/components/unauthorized/unauthorized.component';

function getScopeStr(configId: string) {
  const vultrackScopePrefix = ''; //VULTRACK.Env.oauth.scopePrefix;
  const stigmanScopePrefix = ''; //VULTRACK.Env.stigman.scopePrefix;
  let scopes: string[] = [];

  if (configId === 'vultrack') {
    scopes = [
      `${vultrackScopePrefix}vul-track:read`,
      `${vultrackScopePrefix}vul-track:op`,
      'openid',
      'profile',
      'email',
      'offline_access'
    ];
  } else if (configId === 'stigman') {
    scopes = [
      `${stigmanScopePrefix}stig-manager:stig`,
      `${stigmanScopePrefix}stig-manager:stig:read`,
      `${stigmanScopePrefix}stig-manager:collection`,
      `${stigmanScopePrefix}stig-manager:user`,
      `${stigmanScopePrefix}stig-manager:user:read`,
      `${stigmanScopePrefix}stig-manager:op`,
      'openid',
      'offline_access',
      'email'
    ];
  }

  //if (VULTRACK.Env.oauth.extraScopes && configId === 'vultrack') {
  //  scopes.push(...VULTRACK.Env.oauth.extraScopes.split(' '));
  //} else if (VULTRACK.Env.stigman.extraScopes && configId === 'stigman') {
  //  scopes.push(...VULTRACK.Env.stigman.extraScopes.split(' '));
  //}

  return scopes.join(' ');
}

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    FileUploadService,
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
  exports: [],
  imports: [
    AuthModule.forRoot({
      config: [
        {
          configId: 'vultrack',
          postLoginRoute: '/consent',
          authority: "http://localhost:2020/realms/RMFTools", //VULTRACK.Env.oauth.authority,
          redirectUrl: window.location.origin + '/consent',
          postLogoutRedirectUri: window.location.origin + '/consent',
          clientId: "vul-track", //VULTRACK.Env.oauth.clientId,
          scope: getScopeStr('vultrack'),
          responseType: 'code',
          silentRenew: true,
          silentRenewUrl: `${window.location.origin}/silent-renew.html`,
          renewTimeBeforeTokenExpiresInSeconds: 60,
          useRefreshToken: true,
          autoUserInfo: true,
          ignoreNonceAfterRefresh: true,
          triggerRefreshWhenIdTokenExpired: false,
        },
        {
          configId: 'stigman',
          authority: "http://localhost:2020/realms/RMFTools", //VULTRACK.Env.oauth.authority,
          redirectUrl: window.location.origin + '/consent',
          postLogoutRedirectUri: window.location.origin + '/consent',
          clientId: 'stig-manager', //VULTRACK.Env.stigman.clientId,
          scope: getScopeStr('stigman'),
          responseType: 'code',
          silentRenew: true,
          silentRenewUrl: `${window.location.origin}/silent-renew.html`,
          renewTimeBeforeTokenExpiresInSeconds: 60,
          useRefreshToken: true,
          ignoreNonceAfterRefresh: true,
          triggerRefreshWhenIdTokenExpired: false,
        },
      ],
    }),
    TreeGridModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbAccordionModule,
    NbActionsModule,
    NbAlertModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbToggleModule,
    NbCheckboxModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbLayoutModule,
    NbListModule,
    NbPopoverModule,
    NbSelectModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTooltipModule,
    NbUserModule,
    NgbModule,
    Angular2SmartTableModule,
    CoreModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbMenuModule.forRoot(),
    NbSecurityModule.forRoot(),
    NbSidebarModule.forRoot(),
    NgParticlesModule,
  ]
})
export class AppModule { }
