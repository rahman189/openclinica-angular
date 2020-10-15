import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
@Component({
  selector: 'app-side-bar',
  templateUrl: './app-side-bar.component.html',
  styleUrls: ['./app-side-bar.component.scss']
})
export class AppSideBarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  logout() {
      this.authService.logout();
  }

}
