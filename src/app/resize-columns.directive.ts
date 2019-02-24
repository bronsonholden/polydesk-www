import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[resizeColumns]'
})
export class ResizeColumnsDirective {

  @Input() resizeColumns: number;
  @Output() resizeColumnsChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() nextColumn: number;
  @Output() nextColumnChange: EventEmitter<number> = new EventEmitter<number>();

  resizing = false;
  // Screen x position when resizing started
  resizingAnchor = -1;
  // Width we started resizing at
  resizingFrom = 300;
  // Width of the next column when resizing started
  resizingNextFrom = -1;
  // Maintain next column width?
  resizingMaintainNextWidth = false;

  constructor() { }

  @HostListener('mousedown', [ '$event' ]) onGrabberMouseDown(e) {
    this.resizing = true;
    this.resizingAnchor = e.screenX;
    this.resizingFrom = this.resizeColumns;

    this.resizingNextFrom = this.nextColumn;

    this.resizingMaintainNextWidth = e.shiftKey;

    e.preventDefault();
  }

  @HostListener('document:mouseup', [ '$event' ])
  onMouseUp(e) {
    this.resizing = false;
  }

  @HostListener('document:mousemove', [ '$event' ])
  onMouseMove(e) {
    if (this.resizing) {
      // Allow swapping between maintaining or not mid-resize
      this.resizingMaintainNextWidth = e.shiftKey;

      const dx = e.screenX - this.resizingAnchor;
      const width = Math.max(100, this.resizingFrom + dx);
      const dw = width - this.resizingFrom;

      this.resizeColumnsChange.emit(width);
      this.resizingFrom = width;

      if (!this.resizingMaintainNextWidth) {
        // Give/take width of next column
        let nextWidth = Math.max(100, this.resizingNextFrom - dw);

        this.nextColumnChange.emit(nextWidth);
        this.resizingNextFrom = nextWidth;
      }

      this.resizingAnchor = e.screenX;
    }
  }

}
