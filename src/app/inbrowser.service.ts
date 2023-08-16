import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class InbrowserService {

  constructor() { }

  async openBrowser(link) {
    await Browser.open({ url: link });
  }
}
