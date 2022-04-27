import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { TestComponent } from './components/test/test.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { NgxLoadingModule } from 'ngx-loading'
import { MatSliderModule} from '@angular/material/slider';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatDialogModule} from '@angular/material/dialog';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';
import {MatCardModule} from '@angular/material/card';
import { ModalTextComponent } from './components/modal-text/modal-text.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    DetailComponent,
    TestComponent,
    MenuHeaderComponent,
    ModalLoadingComponent,
    ModalTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([],
      { developmentMode: !environment.production }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    MatSliderModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
