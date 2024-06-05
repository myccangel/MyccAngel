import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(()=>{
       this.router.navigate(['login']);
    },1000) /* timeout will be executed after 1 second to allow us to see the page navigating to login*/

  }
}
