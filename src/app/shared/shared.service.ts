import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  private twoDArray = new BehaviorSubject(null);
  twoDArrayData = this.twoDArray.asObservable();

  storeTwoDArray(message: any) {
    this.twoDArray.next(message)
  }

  private twoDArrayUpdated = new BehaviorSubject(null);
  twoDArrayUpdatedData = this.twoDArrayUpdated.asObservable();

  storeUpdatedTwoDArray(value: any) {
    this.twoDArrayUpdated.next(value)
  }

  private obstructions = new BehaviorSubject(null);
  obstructionsData = this.obstructions.asObservable();

  storeObstructions(obs: any) {
    this.obstructions.next(obs)
  }

  private waterflowPoints = new BehaviorSubject(null);
  waterflowPointsData = this.waterflowPoints.asObservable();

  storeWaterflowPoints(obs: any) {
    this.waterflowPoints.next(obs)
  }

  private rows = new BehaviorSubject(null);
  rowCount = this.rows.asObservable();

  storeRowCount(rows: any) {
    this.rows.next(rows)
  }


  private columns = new BehaviorSubject(null);
  columnCount = this.columns.asObservable();

  storeColumnCount(columns: any) {
    this.columns.next(columns)
  }


  private obsCount = new BehaviorSubject(null);
  obstructionCount = this.obsCount.asObservable();

  storeObstructionCount(obsCount: any) {
    this.obsCount.next(obsCount)
  }
}
