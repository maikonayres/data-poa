import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-errors-notify',
  templateUrl: './errors-notify.component.html',
  styleUrls: ['./errors-notify.component.css']
})
export class ErrorsNotifyComponent implements OnInit {

  @Input() messages: string;

  constructor() {
  }

  ngOnInit() {
  }

}
