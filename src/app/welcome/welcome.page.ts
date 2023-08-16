import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  email: string;
  password: string;
  savedEmail: string;
  savedPassword: string;

  constructor(private modalController:ModalController, private storageService: StorageService) { }

  async ngOnInit() {
    const data = await this.storageService.getAccount()
    this.savedEmail = data.email;
    this.savedPassword = data.password;
  }

  // Check login match
  login() {
    if (this.savedEmail == this.email && this.savedPassword == this.password) {
      this.storageService.saveLogin(true);
      this.modalController.dismiss();
    } else {
      alert("Wrong! Please try again!");
    }
  }
}
