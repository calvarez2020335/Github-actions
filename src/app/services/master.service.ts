import { Injectable } from '@angular/core';
import { ValuesService } from './values.service'

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private valueServices: ValuesService
  ) { }

  getValue(){
    return this.valueServices.getValue();
  }

}
