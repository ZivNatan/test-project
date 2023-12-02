import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../../interfaces';
import { Observable, Subject, auditTime, debounceTime, distinctUntilChanged, of, switchMap, throttleTime } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CardFormComponent } from '../card-form/card-form.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, CardFormComponent,NgxPaginationModule ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnChanges {

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement> | undefined;
  @Input() list: ListItem[] = []; 
  listToDisplay: ListItem[] = []; 

  private searchSubject = new Subject<string>();
  listMenu:boolean = true;
  openForm:boolean = false;
  ascending: boolean= true;
  selectedCard!: ListItem;
  p: number = 1; // Current page

  ngOnInit() {
    this.searchSubject
      .pipe(
        auditTime(300), // Debounce for 300 milliseconds
        distinctUntilChanged(), // Ignore repeated values
        switchMap(() => {
        const searchString = this.searchInput?.nativeElement.value || ''
        return  of(this.list.filter(item => item.name.toLowerCase().startsWith(searchString.toLowerCase())))
        })
      )
      .subscribe(filteredArray => {
        this.listToDisplay = filteredArray || [];
      });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list'].currentValue) {
      this.listToDisplay = this.list
    }
  }

  ascendingClicked(){
    this.ascending = !this.ascending
    if(this.ascending){
      this.list = this.list.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    }else {
      this.list = this.list.sort((a, b) => {
        return b.name.localeCompare(a.name);
      })
    }

  }
  
  openFormClicked(item: ListItem | null){
    if(item){
      this.selectedCard = item;
    }
    this.openForm = true
  }

  formEmitted(e:any){
    if(e.type != 'canceled'){
      if(e.value.id){
        const id = e.value.id;
        const index = this.list.findIndex(item => item.id === id);
        if (index !== -1) {
          this.list[index] = e.value;
        } else {
          console.log('Item not found');
        }
      }else{
        // in real world we will go to server to add record
        e.value.id =  this.list.length;
        this.list.push( e.value)
      }   
    }
    this.openForm = false;
  }

  onInputChange() {
    const searchString:string =  this.searchInput?.nativeElement.value  || '';
    this.searchSubject.next(searchString);
  }
}
