import { Component } from '@angular/core';
import { StorageService } from './storage.service';
import { ModalController } from '@ionic/angular';
import { WelcomePage } from './welcome/welcome.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  // Placeholder notes data
  notes = [
    {
      date: '15-05-2022',
      mood: 5,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '16-05-2022',
      mood: 4,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '17-05-2022',
      mood: 3,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '18-05-2022',
      mood: 4,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '19-05-2022',
      mood: 4,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '20-05-2022',
      mood: 3,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '21-05-2022',
      mood: 5,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample.jpg'
    },{
      date: '24-05-2022',
      mood: 5,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample2.jpg'
    },{
      date: '25-05-2022',
      mood: 4,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample2.jpg'
    },{
      date: '26-05-2022',
      mood: 4,
      note: 'This is a sample for note body content. How does this look?',
      photo: '../assets/smile-sample2.jpg'
    }
  ]
  // Account details
  account = {
    name: "Naomi",
    email: "user@test.com",
    phone: "0405555555",
    gender: "f",
    password: "password"
  }
  constructor(private storageService: StorageService, private modalController: ModalController) {
    this.initializeApp();
  }

  async initializeApp() {
    // Create storage
    this.storageService.create();

    // Initialise storage for settings
    if (await this.storageService.getAccount() == null) {
      this.storageService.saveAccount(this.account);
    }
    // Initialise storage for notes
    if (await this.storageService.getNotes() == null) {
      this.storageService.saveNotes(this.notes);
    }

    // Check login state
    if (await this.storageService.getLogin() == null) {
      this.welcome();
    }
  }

  // Open welcome modal page
  async welcome() {
    const welcomemodal = await this.modalController.create({
      component: WelcomePage,
      componentProps: {}
    });

    return welcomemodal.present();
  }
}