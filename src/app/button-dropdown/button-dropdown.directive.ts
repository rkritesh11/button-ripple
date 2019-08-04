import { DropDownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropDownBackdropComponent } from './dropdown-backdrop/dropdown-backdrop.component';
import { ButtonDropdownComponent } from './button-dropdown.component';
import { Directive, Input, Output, EventEmitter, ContentChild,
    Optional, AfterContentInit, OnDestroy, Self,
InjectionToken, Host,
forwardRef,
Inject,
ViewChild,
AfterViewInit,
ViewChildren,
ContentChildren,
QueryList,
ElementRef} from '@angular/core';

@Directive({
    selector: '[appBtnDropDownTriggerFor]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'dropdownOpen || null',
        '(mousedown)': '_handleMousedown($event)',
        '(click)': '_handleClick($event)',
    },
})
export class ButtonDropdownDirective implements OnDestroy {


    private _dropdown: ButtonDropdownComponent;
    private _dropdownOpen = false;



    @Input('appBtnDropDownTriggerFor')
    get dropdown() { return this._dropdown; }
    set dropdown(dropdown: ButtonDropdownComponent) {
        if (this._dropdown === dropdown) {
            return;
        }
        this._dropdown = dropdown;
        this._dropdown.dropdownClosed.subscribe(() => {
            this.closeDropDown();
        });

    }

  @Output()
   dropdownClosed: EventEmitter<void> = new EventEmitter<void>();

   @Output()
   dropDownOpen: EventEmitter<void> = new EventEmitter<void>();

    constructor(private elmRef: ElementRef) { }

    _handleClick(event: MouseEvent): void {
        this.toggleDropdown();
    }

     _handleMousedown(event: MouseEvent): void {
        console.log(event);
    }
    

    private toggleDropdown() {
        !this._dropdownOpen ? this.openDropDown() : this.closeDropDown();
    }

    private openDropDown() {
        if ( this._dropdownOpen) {
            return;
        }

        this._dropdownOpen = true;
        this._dropdown.onClick(true);
        this.dropDownOpen.emit();
    }

    private closeDropDown() {
        if (! this._dropdownOpen) {
            return;
        }

        this._dropdownOpen = false;
        this._dropdown.onClick(false);
        this.elmRef.nativeElement.focus();
        this.dropdownClosed.emit();
    }

    public ngOnDestroy() {
        this._dropdown.dropdownClosed.unsubscribe();
    }
}
