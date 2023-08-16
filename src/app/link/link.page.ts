import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InbrowserService } from '../inbrowser.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.page.html',
  styleUrls: ['./link.page.scss'],
})
export class LinkPage implements OnInit {

  marker:any;

  constructor(private browser:InbrowserService, private modalController:ModalController) { }

  ngOnInit() {
  }

  // Open a website in Capacitor Browser via Service
  openWeb() {
    let url = 'http://' + this.marker.web;
    this.browser.openBrowser(url);
  }

  // Close the modal
  dismiss() {
    this.modalController.dismiss();
  }

}
