import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListPageComponent } from "./components/list-page/list-page.component";
import { MainService } from './services/main.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ListPageComponent]
})
export class AppComponent implements OnInit {
  title = 'test--project';
  data: any[] = [];

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.mainService.getData().subscribe((result) => {
      this.data = result;
      console.log('data: ', this.data)
    });
  }
}
