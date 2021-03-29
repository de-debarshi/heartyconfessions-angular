import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfessionListComponent } from './confession-list/confession-list.component';
import { SubmitConfessionComponent } from './submit-confession/submit-confession.component';
import { FilterbystatusPipe } from './filterbystatus.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConfessionListComponent,
    SubmitConfessionComponent,
    FilterbystatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
