import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../../interfaces';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxColorsModule } from 'ngx-colors';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, NgxColorsModule, ReactiveFormsModule ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {
  @Input() item!: ListItem; 
  @Output() formSubmit = new EventEmitter<any>();

  title = 'Create New';
  cardForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      id: ['', []],
      name: ['', Validators.required],
      color:  ['#000', Validators.required],
      description: ['', []],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'].currentValue) {
      this.cardForm.get('id')?.setValue( this.item.id || '')
      this.cardForm.get('name')?.setValue( this.item.name || '')
      this.cardForm.get('description')?.setValue( this.item.description || '')
      this.cardForm.get('color')?.setValue( this.item.color || '#000')
    }

  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.formSubmit.emit({type: 'submit', value:  this.cardForm.value} );
    } else {
      alert('Form is not valid');
    }
  }

  closeForm(){
    this.formSubmit.emit({type: 'canceled'});
  }

}
