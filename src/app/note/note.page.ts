import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  notes;
  note = {};
  index;

  constructor(private route: ActivatedRoute, private storageService: StorageService) { }

  async ngOnInit() {
    this.notes = await this.storageService.getNewestNotes();
    this.route.params.subscribe(params => {
      let index = params['id'];
      this.note = this.notes[index];

    });
  }

}
