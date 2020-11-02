import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Country } from 'src/app/models/country.model';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'country-city-tree',
  templateUrl: './country-city-tree.component.html',
  styleUrls: ['./country-city-tree.component.scss'],
})
export class CountryCityTreeComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input()
  countries: Country[];

  @Input()
  cities: City[];

  countryItems: TreeNode[];
  cityItems: TreeNode[];

  node: TreeNode;

  @Output()
  // tslint:disable-next-line: ban-types
  selectedCountry: EventEmitter<String> = new EventEmitter<String>();

  constructor() {
    this.countryItems = [];
    this.cityItems = [];
  }

  ngOnInit() {}

  nodeSelect(event) {
    console.log('Node selected--->' + JSON.stringify(event.node.data));
    this.selectedCountry.emit(event.node.data);

    this.node = event.node;
    console.log('Node--->' + JSON.stringify(this.node));
  }

  nodeExpand(event) {
    console.log('Node expanded--->' + JSON.stringify(event.node.data));
    this.selectedCountry.emit(event.node.data);
    this.node = event.node;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.countries) {
      this.countries.forEach((c) => {
        this.countryItems.push({
          label: c.name,
          data: c.code,
          // expandedIcon: "flag-icon flag-icon-" + c.code.toLowerCase(),
          // collapsedIcon: "flag-icon flag-icon-" + c.code.toLowerCase(),
          children: [{}],
        });
      });
    } else {
      console.log('Nothing to do here...!');
    }

    if (changes.cities) {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log(
        'currentValue: ' + JSON.stringify(changes.cities.currentValue)
      );
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      this.cityItems = [];
      changes.cities.currentValue.forEach((c) => {
        this.cityItems.push({
          label: c.city,
          data: c.code,
          expandedIcon: 'fa-folder-open',
          collapsedIcon: 'fa-folder',
          children: [],
        });
      });
      this.node.children = [];
      this.node.children = this.cityItems;
    }
  }

  ngAfterViewInit() {}

  nodeUnselect(event) {}

  nodeExpandMessage(event) {}
  //   getCountryList() {
  //     var data = require('assets/data/countries.json') // data : [country : [cities]]
  //     var countries = [];
  //     for (let key in data["countries"]) {
  //         countries.push(key);
  //     }
  //     return countries;
  // }
}
