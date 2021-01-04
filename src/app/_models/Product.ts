export interface Product {
  item_name: string;
  item_id: number;
  gender_id: number;
  size: string;
  departName: string;
  intlDesc: string;
  material?: string;
  materialAr?: string;
  description?: string;
  descriptionAr?: string;
  long_desc: string;
  dept_id: string;
  msrp: string;
  rtp: string;
  color1_id: string;
  colorDesc: string;
  season_id: string;
  systemPrice: string;
  qty: number;
  slides?:any;
  colorCode?:string;
}

export interface Item {
  item_name: string;
  item_id: number;
  msrp: string;
  rtp: string;
  image:string;
  category:string;
}

export function scrollWindowToTop(){
  let scrollToTop = window.setInterval(() => {
    let pos = window.pageYOffset;
    if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
        window.clearInterval(scrollToTop);
    }
  }, 16);
}

export class Message {
  content: string;
  style: string;
  dismissed: any;
  button1:object;
  button2:object;

  constructor(content:string, style:string, dismissed:any, button1?:object, button2?:object) {
    this.content = content
    this.style = style || 'info'
    this.dismissed =  dismissed
    this.button1 = button1 || {}
    this.button2 = button2 || {}
  }

}