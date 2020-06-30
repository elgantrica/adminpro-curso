import { Component, OnInit } from '@angular/core';
declare function init_plugins();


@Component({
  selector: 'app-npagefound',
  templateUrl: './npagefound.component.html',
  styleUrls: ['./npagefound.component.css']
})
export class NpagefoundComponent implements OnInit {
  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
