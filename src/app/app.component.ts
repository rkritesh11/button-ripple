import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'button-ripple';

  public onOptionClick(index: number) {
    console.log('option clicked', index);
  }
}
