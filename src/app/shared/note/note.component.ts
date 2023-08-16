import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/note';

@Component({
  selector: 'note',
  inputs: ['note'],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {

  note: Note;

  constructor() { }

  ngOnInit() {}

}
