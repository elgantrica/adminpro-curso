import { Component, OnInit } from '@angular/core';
declare function init_plugins();


@Component({
  selector: 'app-npagefound',
  templateUrl: './npagefound.component.html',
  styles: []
})
export class NpagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
