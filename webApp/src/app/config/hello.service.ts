import { Injectable } from '@angular/core';

@Injectable()
export class HelloService {

  constructor() { }

  public hello() {
    console.log('hello');
  }

}
