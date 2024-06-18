import { Router} from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {


  @Input() headerTitle!: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  signup(){
    this.router.navigate(['register']);
  }
  login(){
    this.router.navigate(['login']);
  }
  donation(){
    this.router.navigate(['donation']);
  }
  photo(){
    this.router.navigate(['photo']);
  }

  video(){
    this.router.navigate(['video']);
  }



}
