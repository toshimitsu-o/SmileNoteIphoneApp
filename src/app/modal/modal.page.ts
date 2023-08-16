import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Note } from '../note';
import { PhotoService } from '../services/photo.service';
// import date-fns library
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  note: Note;
  editaddbtn = "Edit";
  imageFile: any;

  constructor(private modalController:ModalController, private imagePicker: ImagePicker, public photoService: PhotoService) { }

  ngOnInit() {
    
    //this.note = this.navParams.get('note');
    // Change the button title Edit/Add
    if (this.note != undefined) {
      this.editaddbtn = "Edit";
    } else {
      this.editaddbtn = "Add";
      this.note = new Note;
    }
  }

  // Process after selecting an image
  imageSelected(files) {
    let fileReader = new FileReader();

    fileReader.onload = e => {
      this.imageFile = e.target.result;
      this.note.photo = this.imageFile;
    };

    fileReader.readAsDataURL(files[0]);
  }

  // Close the modal and save
  closemodal() {
    this.modalController.dismiss(this.note);
  }

  // Close the modal without saving
  dismiss() {
    this.modalController.dismiss();
  }

  // Convert the selected date format and save
  updateDate(date) {
    this.note.date = this.formatDate(date)
  }

  // Convert date format using date-fns library
  formatDate(value: string) {
    return format(parseISO(value), 'dd-MM-yyyy');
  }

  // Add photo to gallery
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
