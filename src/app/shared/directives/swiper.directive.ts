import {Directive, ElementRef, Input} from '@angular/core';
import {SwiperOptions} from 'swiper/types';

@Directive({
  selector: '[appSwiper]'
})
export class SwiperDirective {

  swiperElement: HTMLElement;

  @Input('config') config?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit(): void {
    Object.assign(this.el.nativeElement, this.config);
  }
}
