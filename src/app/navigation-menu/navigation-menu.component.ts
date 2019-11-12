import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mma-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
  title = 'MMV';
  pageTitle = 'Meeting monitor application';
  constructor() { }

  ngOnInit() {
  }

}
