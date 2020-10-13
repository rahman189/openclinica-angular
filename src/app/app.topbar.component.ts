import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
    @Output() myEvent = new EventEmitter();
    function() {
        this.myEvent.emit(true)
    }
}
