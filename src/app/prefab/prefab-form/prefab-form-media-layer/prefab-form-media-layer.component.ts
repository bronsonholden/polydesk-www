import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-prefab-form-media-layer',
  templateUrl: './prefab-form-media-layer.component.html',
  styleUrls: ['./prefab-form-media-layer.component.scss']
})
export class PrefabFormMediaLayerComponent implements OnInit {

  @Input() view: any;
  @Input() model: any;
  @Input() options: any;
  @Output() modelChange = new EventEmitter<any>();

  layout: any = {};
  currentLayoutSize: any;
  watcher: any;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit() {
    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      const size = change.mqAlias;

      if (this.currentLayoutSize !== size) {
        this.currentLayoutSize = size;
        this.layout = this.bestLayoutFor(size);
      }
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  ngOnChanges(changes) {
    if (changes.view && !changes.view.firstChange) {
      this.layout = this.bestLayoutFor(this.currentLayoutSize);
    }
  }

  bestLayoutFor(size) {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

    if (this.view[size]) {
      return this.view[size];
    }

    const sizeIdx = sizes.indexOf(size);
    let offset = 0;

    let definedSizes = Object.keys(this.view).filter(s => sizes.indexOf(s) > -1);
    let closestSize = definedSizes.sort((a, b) => {
      let _a = Math.abs(sizes.indexOf(a) - sizeIdx);
      let _b = Math.abs(sizes.indexOf(b) - sizeIdx);
      if (_a === _b) {
        return sizes.indexOf(a) - sizes.indexOf(b); // Prefer smaller layout
      } else {
        return _a - _b;
      }
    });

    return this.view[closestSize[0]];
  }

}
