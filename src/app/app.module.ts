import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {StartComponent} from './start/start.component';
import {MatcherComponent} from './matcher/matcher.component';
import {IngredientMatcherComponent} from './ingredient-matcher/ingredient-matcher.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {ManualSelectorComponent} from './manual-selector/manual-selector.component';
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {path: '', component: MatcherComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    MatcherComponent,
    IngredientMatcherComponent,
    HeaderComponent,
    ManualSelectorComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
