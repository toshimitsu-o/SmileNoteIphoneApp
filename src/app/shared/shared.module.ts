import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoteComponent } from './note/note.component';


@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [NoteComponent]
})
export class SharedModule { }
