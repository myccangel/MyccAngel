import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.router.navigate(['home']);

  }


}
