import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundServiceService {

  private backgroundKey = 'background';
  private prefix = 'taiichi:';
  private backFlag = 'f2';
  constructor() { 
    const flag = localStorage.getItem(this.prefix + this.backgroundKey);
    if (flag != null) {
      this.backFlag = flag;
    } else {
      localStorage.setItem(this.prefix + this.backgroundKey, this.backFlag);
    }
  }

  saveBG(bFlag: string){
    this.backFlag = bFlag;
    localStorage.setItem(this.prefix + this.backgroundKey, this.backFlag);
  }

  getBG(){
    return this.backFlag;
  }


}
