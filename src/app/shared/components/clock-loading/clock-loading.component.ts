import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-clock-loading',
  template: `<div class="spinner"></div>`,
  styleUrls: ['./clock-loading.component.scss'],
})
export class ClockLoadingComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
