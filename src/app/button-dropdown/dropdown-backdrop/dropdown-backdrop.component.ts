import { Component, OnInit, Input, HostListener, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-backdrop',
    templateUrl: 'dropdown-backdrop.component.html',
    styleUrls: ['dropdown-backdrop.component.scss'],
})

export class DropDownBackdropComponent implements OnInit {
    @Input() show;

    @Output()
    backdropClicked = new EventEmitter<void>();
    constructor() { }

    ngOnInit() { }


    @HostListener('click', ['$event'])
    onclick(event) {
        this.show = false;
        this.backdropClicked.emit();
    }
}
