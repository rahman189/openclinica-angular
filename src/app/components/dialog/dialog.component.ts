import { Component, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {
  @ViewChild("tpl") tpl: TemplateRef<any>;

  ngAfterViewInit(): void {
    let elementRef = this.tpl.elementRef;
    console.log(elementRef.nativeElement.textContent);
  }

}
