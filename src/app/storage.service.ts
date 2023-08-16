import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  account: any;
  notes = [];

  constructor(private storage:Storage) { }

  // Retrieve notes from storage
  async getNotes() {
    this.notes = await this.storage.get("notes");
    return this.notes;
  }

  // Retrieve notes newest first from storage
  async getNewestNotes() {
    let array = await this.storage.get("notes");
    this.notes = this.sortByKey(array, 'date');
    return this.notes;
  }

  // Sort array
  sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 0 : 1));
    });
  }
  
  // Save account to storage
  saveNotes(data) {
    this.storage.set("notes", data);
  }

  // Retrieve account from storage
  async getAccount() {
    this.account = await this.storage.get("account");
    return this.account;
  }
  
  // Save account to storage
  saveAccount(data) {
    this.storage.set("account", data);
  }

  // Get login status
  async getLogin() {
    return await this.storage.get("login");
  }

  // Save login status
  async saveLogin(val) {
    this.storage.set("login", val);
  }

  // create Storage
  create() {
    this.storage.create();
  }

}
