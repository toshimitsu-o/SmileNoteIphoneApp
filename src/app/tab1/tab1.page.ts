import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  notes = [];

  constructor(private router: Router, private modalController: ModalController, private storageService: StorageService) {}

  async ionViewWillEnter() {
    // Retrieve note data from storage
    this.notes = await this.storageService.getNewestNotes();
  }

  // Open and show note
  openNote(i:number) {
    this.router.navigate(['/note', i]);
  }

  // Open modal to add a note
  async addNote() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { }
    });

    // Close and save note data
    modal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
          this.notes.push(retval.data);
          this.storageService.saveNotes(this.notes);
          this.updateList();
        }
      });
      return modal.present();
  }

  // Delete a note
  delete(i:number) {
    this.notes.splice(i,1);
    this.storageService.saveNotes(this.notes)
  }

  // Open modal to edit note at index i
  async edit(i:number){
    const editmodal = await this.modalController.create({
      component: ModalPage,
      componentProps: { 
        note:this.notes[i]
        }
    });
   
    // Close modal and save note data
    editmodal.onDidDismiss()
      .then((retval) => {
        if (retval.data !== undefined) {
        this.notes[i] = retval.data;
        this.storageService.saveNotes(this.notes)
        this.updateList();
        }
   });
     return editmodal.present();
  }
  updateList() {
    this.storageService.sortByKey(this.notes, 'date');
  }

}
