import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CityInputComponent} from './mainDirectory/city-input-component/city-input.component';
import {OutputCardsComponent} from './mainDirectory/output-cards-component/output-cards.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    OutputCardsComponent,
    CityInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ScrollingModule,
    MatChipsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

