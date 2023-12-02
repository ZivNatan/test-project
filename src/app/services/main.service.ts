import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ListItem } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private dataUrl = 'assets/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getData(): Observable<ListItem[]> {
    return this.http.get<ListItem[]>(this.dataUrl).pipe(
      map(data => this.transformData(data))
    );;
  }

  transformData(data:ListItem[]){
     data.forEach((item: ListItem)=>{
      item.lastUpdate = new Date(item.lastUpdate )
      item.createdDate = new Date(item.createdDate )
      
     })
     return data
  }
}
