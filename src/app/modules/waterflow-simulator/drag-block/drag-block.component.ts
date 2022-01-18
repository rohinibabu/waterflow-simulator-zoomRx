import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'drag-block',
  templateUrl: './drag-block.component.html',
  styleUrls: ['./drag-block.component.css']
})
export class DragBlockComponent implements OnInit {

  enableSimulationButton = true;


  blockedCell: any = {};

  array2D: any = [[]];
  array2DWithBlock: any = [[]];
  obstructions: any = [];

  rows: any = 0; // Known at run time
  columns: any = 0; // Known at run time
  noOfObstructions: any = 0; // Known at run time

  waterflowStartPoint: number = 0; //water flow Column start

  waterFlowArray: any = [];

  addedBlock = 0;


  constructor(private sharedDataService: SharedService,
    private router: Router) {


  }

  ngOnInit(): void {

    this.sharedDataService.twoDArrayData.subscribe(message => (
      this.array2D = message

    ));

    this.array2DWithBlock = JSON.parse(JSON.stringify(this.array2D));

    this.sharedDataService.twoDArrayUpdatedData.subscribe(updatedData => (
      this.array2DWithBlock = updatedData

    ));

    this.sharedDataService.obstructionsData.subscribe(obs => (
      this.obstructions = obs

    ));

    this.sharedDataService.rowCount.subscribe(rows => (
      this.rows = rows
    ));


    this.sharedDataService.columnCount.subscribe(columns => (
      this.columns = columns

    ));


  }



  allowDrop(ev: any) {
    ev.preventDefault();
    //console.log('--Drag---');
    //console.log('row', row, 'column', column);
    //console.log('event', ev);
  }

  drag(ev: any) {
    ev.dataTransfer.setData('text', ev.target.id);
    //console.log('ob,event', ev, ev.target.id);
  }

  drop(ev: any, row: any, column: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
    //console.log('--Drop---');
    console.log('row', row, 'column', column);
    //console.log('ob,event', ev, data);

    //console.log('2D Before', this.array2D);
    if (row != undefined && column != undefined) {
      let lg: { name: string; row: number; column: number };

      lg = {
        name: data,
        row: row,
        column: column,
      };

      if (this.blockedCell[data]) {
        let blockRemovedRow = this.blockedCell[data].row;
        let blockRemovedColumn = this.blockedCell[data].column;
        this.array2DWithBlock[blockRemovedRow][blockRemovedColumn] = 'W';
      }

      this.blockedCell[data] = lg;

      this.array2DWithBlock[row][column] = 'B';

      const index = data.split('').pop();
      console.log('B dragged', data.split('').pop());
      //  this.obstructions[index] = 'W';

      console.log('blockMappingConfig', this.blockedCell);

      console.log('obstructions', this.obstructions, this.obstructions[index]);
    }

    if (row == undefined && column == undefined && data) {
      let blockRemovedRow = this.blockedCell[data].row;
      let blockRemovedColumn = this.blockedCell[data].column;
      this.array2DWithBlock[blockRemovedRow][blockRemovedColumn] = 'W';
      console.log('W dragged', data.split('').pop());
      const index = data.split('').pop();
      // this.obstructions[index] = 'B';

      console.log('obstructions', this.obstructions, this.obstructions[index]);

    }

    console.log('2D After Adding Block', this.array2DWithBlock);

    this.sharedDataService.storeUpdatedTwoDArray(this.array2DWithBlock);

    this.sharedDataService.storeObstructions(this.obstructions);

    // startSimulate button enable /disable handling

    let count = this.calculateCount(this.array2DWithBlock, 'B');
    if (count > 0) {
      this.enableSimulationButton = false;
    } else {
      this.enableSimulationButton = true;
    }

  }


  calculateCount(arr: any, query: any) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === query) {
        count++;
        continue;
      }
      if (Array.isArray(arr[i])) {
        count += this.calculateCount(arr[i], query);
      }
    }
    console.log('count', count)
    return count;
  }


  drag1(ev: any) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  start() {
    this.router.navigate(['/simulate-water']);
  }

  back() {
    this.router.navigate(['grid-create']);
  }


}
