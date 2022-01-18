import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-simulate-water',
  templateUrl: './simulate-water.component.html',
  styleUrls: ['./simulate-water.component.css']
})
export class SimulateWaterComponent implements OnInit {


  array2DWithBlock: any = [[]];

  obstructions: any = [];


  rows: any = 0; // Known at run time
  columns: any = 0; // Known at run time
  noOfObstructions: any = 0; // Known at run time

  waterflowStartPoint: number = 0; //water flow Column start

  waterFlowArray: any = [];

  cloneWaterFlowArray: any = [];

  waterFlowPointSelectPanel = true;
  waterFlowingPanel = false;

  cloneArray2DWithBlock: any = [[]];

  constructor(private sharedDataService: SharedService,
    private router: Router) { }

  ngOnInit(): void {


    this.sharedDataService.obstructionsData.subscribe(obs => (

      this.obstructions = obs

    ));

    this.sharedDataService.twoDArrayUpdatedData.subscribe(val => (

      this.array2DWithBlock = val

    ));

    this.cloneArray2DWithBlock = JSON.parse(JSON.stringify(this.array2DWithBlock));
    console.log("array2DWithBlock", this.array2DWithBlock);

    this.sharedDataService.waterflowPointsData.subscribe(points => (
      this.waterFlowArray = points

    ));

    this.cloneWaterFlowArray = JSON.parse(JSON.stringify(this.waterFlowArray));

    this.sharedDataService.rowCount.subscribe(rows => (
      this.rows = rows
    ));


    this.sharedDataService.columnCount.subscribe(columns => (
      this.columns = columns

    ));

  }

  startWaterFlow(flowpoint: any) {
    this.waterflowStartPoint = flowpoint;
    this.waterFlowArray = [];
    for (var i = 0; i < this.columns; i++) {
      this.waterFlowArray.push('nocolor');
    }
    this.waterFlowArray[flowpoint] = 'darkblue';
    this.waterFlowPointSelectPanel = false;
    this.waterFlowingPanel = true;
    this.flowWater(0, this.waterflowStartPoint);

    console.log('waterFlowingPanel', this.waterFlowingPanel);
  }


  flowWater(row: any, column: any) {
    if (row >= this.rows || column >= this.columns || row < 0 || column < 0) {
      return this.array2DWithBlock;
    }
    if (this.array2DWithBlock[row][column] != 'B') {
      this.array2DWithBlock[row][column] = 'Fill';
      row++;
      this.flowWater(row, column);
    } else if (this.array2DWithBlock[row][column] == 'B') {
      if (row != 0) {
        row--;
      }

      let left = 0;
      let right = 0;

      left = column - 1;

      right = column + 1;

      this.flowWater(row, left);
      this.flowWater(row, right);

    }
    console.log('out', this.array2DWithBlock);


  }

  drag1(ev: any) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  back() {
    this.router.navigate(['/drag-block']);
  }

  reset() {
    this.array2DWithBlock = [[]];
    console.log("cloneArray2DWithBlock",this.cloneArray2DWithBlock)
    this.array2DWithBlock = JSON.parse(JSON.stringify(this.cloneArray2DWithBlock));
    this.waterFlowArray = this.cloneWaterFlowArray;
    this.waterFlowPointSelectPanel = true;
    this.waterFlowingPanel = false;

  }
}
