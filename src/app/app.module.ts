import { DropDownBackdropComponent } from './button-dropdown/dropdown-backdrop/dropdown-backdrop.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonDropdownComponent } from './button-dropdown/button-dropdown.component';
import { ButtonDropdownDirective } from './button-dropdown/button-dropdown.directive';
import { DropDownItemComponent } from './button-dropdown/dropdown-item/dropdown-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDropdownComponent,
    ButtonDropdownDirective,
    DropDownItemComponent,
    DropDownBackdropComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
