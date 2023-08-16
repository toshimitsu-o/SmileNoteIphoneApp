import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  notes = [];
  tempNotes = [];
  noteDates = [];
  noteMoods = [];

  @ViewChild('barCanvas', {static:true}) barCanvas;
  barChart:any;

    // Create data and display option arrays for the default data.
    dataforchart = this.noteMoods;
    chartType = "line";
    labels = this.noteDates;
    backgroundcolors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ];
    bordercolors = [
      'rgba(255,99,132,1)',
      'rgba(54,162,235,1)',
      'reba(255, 206,86,1)',
      'rgba(75, 192,192,1)',
      'rgba(153, 102, 255,1)',
      'rgba(255,159,64,1)'
    ];
    chartconfig = {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: [{
          label: "mood",
          data: this.dataforchart,
          backgroundColor: this.backgroundcolors,
          borderColor: this.bordercolors,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
    // Retrieve note data from storage
    this.notes = await this.storageService.getNewestNotes();
    // Generate mood data for chart
    this.tempNotes = this.notes.slice();
    this.generateMood();
  }

  ngOnInit() {}

  // Filter number of mood to display in chart
  filterMood(n:number) {
    this.emptyChart();
    
    // Clear the chart values before generating new chart data
    if (n < this.notes.length) {
      this.tempNotes = this.notes.slice(0,n);
      
    } else {
      this.tempNotes = this.notes.slice();
    }
    this.updateMood();
  }

  // Generate chart for mood
  createChart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, this.chartconfig);
  }
  
  // Generate mood data for chart
  generateMood() {
    for (let i =0; i < this.tempNotes.length; i++) {
      this.noteDates.push(this.tempNotes[i].date);
      this.noteMoods.push(this.tempNotes[i].mood);
    }
    this.createChart();
  }

  // Generate mood data for chart
  updateMood() {
    for (let i =0; i < this.tempNotes.length; i++) {
      this.noteDates.push(this.tempNotes[i].date);
      this.noteMoods.push(this.tempNotes[i].mood);
    }
    this.createChart();
  }
    // Empty the chart to clear the data
    emptyChart() {
      this.barChart.destroy();
    }

}
