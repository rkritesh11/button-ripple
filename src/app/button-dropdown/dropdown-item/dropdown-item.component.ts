import { Component, OnInit, HostListener, Input, ContentChildren,
    ChangeDetectionStrategy, ViewEncapsulation, QueryList, AfterContentInit, ElementRef } from '@angular/core';

@Component({
    selector: '[app-dropdown-item]',
    templateUrl: 'dropdown-item.component.html',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
    '[attr.aria-expanded]': 'menuOpen || null',
    '[attr.role]': 'role',
    'class': 'dropdown-item',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled || null',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dropdown-item.component.scss'],
})

export class DropDownItemComponent implements OnInit, AfterContentInit {

    @Input() disabled = false;
    highlighted = false;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() { }

    @HostListener('click', ['$event'])
    _checkDisabled(event: Event): void {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

     _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
    }

    ngAfterContentInit(){
        // console.log('content init', this.dropDownItem);
    }

    focus(event) {
        console.log(event);
        const nativeElement = this._getNativeElement();
        this.highlighted = true;
        nativeElement.focus();
    }

    removeFocus() {
        this.highlighted = false;
    }

    _getNativeElement() {
        return this.elementRef.nativeElement;
    }
}
