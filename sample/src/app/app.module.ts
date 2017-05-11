import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { routing } from './app.routing';

import { YoutubePlayerModule } from 'ng2-youtube-player';

import { AppComponent } from './app.component';
import { VplayerComponent } from './vplayer/vplayer.component';
import { VimeoService } from './vimeo.service';
import { VplaylistComponent } from './vplaylist/vplaylist.component';
import { VideoComponent } from './vplayer/video';
import { WindowRefService } from './window-ref.service';
import { FilterPipe } from './filter.pipe';
import { CalendarModule } from 'angular-calendar';
import { AgendaComponent } from './agenda/agenda.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarUtilsModule } from './calendar-utils/module';
import { LabsMenus } from './layouts/menus';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthService } from './access/auth.service';
import { AccountService } from './access/account.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CoolHttpModule } from 'angular2-cool-http';
import { AccessModule } from './access/access.module';
import { CategoryFormComponent } from './category/category.form';

import {ArticleFormComponent} from './articles/article.form';
import { ArticlePanelComponent } from './articles/article.panel';
import { ArticleService } from './articles/article.service';


import { QuillEditorModule } from 'ng2-quill-editor';
import { CmtFormComponent } from './cmt-box/cmt-form';
import { CmtListComponent } from './cmt-box/cmt-list';
//import { CmtComponent } from './cmt/cmt.component';
//import { CmtFormComponent } from './cmt/cmt.form';
//import { CategoryComponent } from './category/category.component';
//import { CategoryFormComponent } from './category/category.form';
//import { UserComponent } from './access/user/user.component';
//import { StormpathConfiguration, StormpathModule } from 'angular-stormpath';


/*
export function stormpathConfig(): StormpathConfiguration {
 let spConfig: StormpathConfiguration = new StormpathConfiguration();
 spConfig.endpointPrefix = 'http://localhost:8000';
 spConfig.meUri = '/api/auth/me';
 spConfig.autoAuthorizedUris.push(new RegExp('http://localhost:8000/*'));
 return spConfig;
}
*/
@NgModule({
  declarations: [
    AppComponent,
    VplayerComponent,
    VplaylistComponent,
    VideoComponent,
    FilterPipe,
    AgendaComponent,
    LabsMenus,
    HomeComponent,
    ArticlesComponent,
    ArticleFormComponent,
    ArticlePanelComponent,
    CategoryFormComponent,
    CmtFormComponent,
    CmtListComponent

    //UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,

      VgCoreModule,
      VgControlsModule,
      VgOverlayPlayModule,
      VgBufferingModule,

     YoutubePlayerModule,
     CalendarModule.forRoot(),
     NgbModalModule.forRoot(),
     CalendarUtilsModule,
     CoolHttpModule,
     AccessModule,
     QuillEditorModule
    // StormpathModule
  ],
  providers: [CookieService,VimeoService,WindowRefService,AccountService,AuthService,ArticleService
  //,{provide: StormpathConfiguration, useFactory: stormpathConfig}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
