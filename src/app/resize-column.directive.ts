import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

const MIN_COL_WIDTH = 25;

@Directive({
  selector: '[resizeColumn]'
})
export class ResizeColumnDirective {

  @Input() resizeColumn: number;
  @Output() resizeColumnChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() nextColumn: number;
  @Output() nextColumnChange: EventEmitter<number> = new EventEmitter<number>();

  resizing = false;
  // Screen x position when resizing started
  resizingAnchor = -1;
  // Width we started resizing at
  resizingFrom = 300;

  constructor() { }

  @HostListener('mousedown', [ '$event' ]) onGrabberMouseDown(e) {
    this.resizing = true;
    this.resizingAnchor = e.screenX;
    this.resizingFrom = this.resizeColumn;

    e.preventDefault();
  }

  @HostListener('document:mouseup', [ '$event' ])
  onMouseUp(e) {
    this.resizing = false;
  }

  @HostListener('document:mousemove', [ '$event' ])
  onMouseMove(e) {
    if (this.resizing) {
      const dx = e.screenX - this.resizingAnchor;
      const width = Math.max(MIN_COL_WIDTH, this.resizingFrom + dx);
      const dw = width - this.resizingFrom;

      this.resizeColumnChange.emit(width);
      this.resizingFrom = width;

      this.resizingAnchor = e.screenX;
    }
  }

}
