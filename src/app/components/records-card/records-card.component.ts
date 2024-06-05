import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-records-card',
  templateUrl: './records-card.component.html',
  styleUrls: ['./records-card.component.scss'],
})
export class RecordsCardComponent implements OnInit {
  @Input() hasFooter: boolean | undefined;
  @Input() hasHeader: boolean | undefined;
  @Input() status: string | undefined;
  @Input() updateAt: string | undefined;
  @Input() createAt: string | undefined;
  @Input() notes: string | undefined;
  @Input() value: string | undefined;

  constructor() {}

  ngOnInit() {}
}

