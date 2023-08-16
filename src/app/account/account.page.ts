import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  account = [];
  
  constructor(private storageService: StorageService) { }

  async ngOnInit() {
    // Retrieve account data from storage
    this.account = await this.storageService.getAccount();
  }

  // Update/save account data
  updateAcc() {
    this.storageService.saveAccount(this.account);
  }
}
