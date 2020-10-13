import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <mat-nav-list>
        <mat-list-item *ngFor="let item of menuList" [routerLink]="item.url">
            {{item.name}}
        </mat-list-item>
    </mat-nav-list>
  `
})
export class AppMenuComponent {
  menuList: object[] = [
    {
      name: 'Home',
      url: ''
    },
    {
      name: 'Page 1',
      url: '/page-1'
    },
    {
      name: 'Page 2',
      url: '/page-2'
    }
  ]
}
