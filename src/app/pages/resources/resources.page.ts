import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Initialization code can go here if needed
  }

  navigateTo(resource: string) {
    // Navigate to the corresponding section
    this.router.navigate([`/resources/${resource}`]);
  }
}
