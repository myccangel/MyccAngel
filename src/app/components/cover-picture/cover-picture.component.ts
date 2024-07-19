import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-picture',
  templateUrl: './cover-picture.component.html',
  styleUrls: ['./cover-picture.component.scss'],
})
export class CoverPictureComponent implements OnInit {
  @Input() imageUrl: string = ''; // Input property to receive the image URL
  @Input() altText: string = 'Cover Image'; // Input property for alt text

  constructor() { }

  ngOnInit() {}
}
