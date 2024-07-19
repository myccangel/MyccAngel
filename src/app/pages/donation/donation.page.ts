import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  activeTab: string = 'monthly';
  activeStep: string = 'step1-content';

  constructor() { }

  ngOnInit() {
  }

  showTab(tabId: string) {
    this.activeTab = tabId;
  }

  showStep(stepId: string) {
    this.activeStep = stepId;
  }
}
