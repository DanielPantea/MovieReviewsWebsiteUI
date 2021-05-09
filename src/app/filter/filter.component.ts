import { Component, OnInit } from '@angular/core';
import { enTag } from './../_utility/tag.enum';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  tags: any;

  StringIsNumber = value => isNaN(Number(value)) === false;

  ToArray(ennume) {
    return Object.keys(ennume)
        .filter(this.StringIsNumber)
        .map(key => ennume[key]);
  }
  
  constructor() { }

  ngOnInit(): void {
    this.tags = this.ToArray(enTag);
  }

}
