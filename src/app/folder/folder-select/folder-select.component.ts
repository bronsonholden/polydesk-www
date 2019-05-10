import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';

@Component({
  selector: 'app-folder-select',
  templateUrl: './folder-select.component.html',
  styleUrls: ['./folder-select.component.scss']
})
export class FolderSelectComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(private router: Router) { }

  ngOnInit() {
    // Deactivate the outlet manually. Since the router-outlet will be in
    // a modal, it gets removed before the outlet can deactivate. If that
    // happens, routing will break once the outlet is activated again.
    let sub = this.router.events.subscribe(event => {
      if (event instanceof ActivationStart && event.snapshot.outlet === 'select-dialog-outlet') {
        this.outlet.deactivate();
        sub.unsubscribe();
      }
    });
  }

}
