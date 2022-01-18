import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-grid-creation',
  templateUrl: './grid-creation.component.html',
  styleUrls: ['./grid-creation.component.css']
})
export class GridCreateComponent implements OnInit {

  value1: any = 0;
  value2: any = 0;
  value3: any = 0;

  options: Options = {
    floor: 0,
    ceil: 10,
  };

  rows: any = 0; // Known at run time
  columns: any = 0; // Known at run time
  noOfObstructions: any = 0; // Known at run time

  waterFlowArray: any = [];

  array2D: any = [[]];
  array2DWithBlock: any = [[]];
  obstructions: any = [];

  blockedCell: any = {};

  constructor(private router: Router,
    private sharedDataService: SharedService) { }

  ngOnInit(): void {
    this.sharedDataService.rowCount.subscribe(rows => (

      this.value1 = rows

    ));

    this.rows = this.value1;

    this.sharedDataService.columnCount.subscribe(columns => (
      this.value2 = columns

    ));

    this.columns = this.value2;

    this.sharedDataService.obstructionCount.subscribe(obs => (

      this.value3 = obs


    ));

    this.noOfObstructions = this.value3;
  }

  selectedRows(event: any) {
    console.log('given rows' + event);
    this.rows = event;
  }

  selectedColumns(event: any) {
    console.log('given columns' + event);
    this.columns = event;
  }

  selectedObstructions(event: any) {
    console.log('given obstructions' + event);
    this.noOfObstructions = event;
  }


  Next() {
    this.blockedCell = {};
    this.array2D = [[]];
    this.array2DWithBlock = [[]];
    this.waterFlowArray = [];

    for (let r = 0; r < this.rows; r++) {
      this.array2D[r] = [];
      for (let c = 0; c < this.columns; c++) {
        this.array2D[r][c] = 'W';
      }
    }


    console.log(this.array2D);

    this.array2DWithBlock = JSON.parse(JSON.stringify(this.array2D));

    this.obstructions = [];

    for (let r = 0; r < this.noOfObstructions; r++) {
      this.obstructions.push('B');
    }
    console.log('obstructions', this.obstructions);

    for (var i = 0; i < this.columns; i++) {
      this.waterFlowArray.push('lightblue');
    }

    this.sharedDataService.storeTwoDArray(this.array2D);

    this.sharedDataService.storeUpdatedTwoDArray(this.array2DWithBlock);

    this.sharedDataService.storeObstructions(this.obstructions);

    this.sharedDataService.storeWaterflowPoints(this.waterFlowArray);

    this.sharedDataService.storeRowCount(this.rows);

    this.sharedDataService.storeColumnCount(this.columns);

    this.sharedDataService.storeObstructionCount(this.noOfObstructions);

    this.router.navigate(['/drag-block']);
  }

}
