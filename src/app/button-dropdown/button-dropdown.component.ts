import { DropDownItemComponent } from './dropdown-item/dropdown-item.component';
import { DropDownBackdropComponent } from './dropdown-backdrop/dropdown-backdrop.component';
import { Component, OnInit, ViewChild, AfterViewInit,
  OnDestroy, Output,
  EventEmitter, QueryList, ContentChildren, ViewChildren, ContentChild } from '@angular/core';

@Component({
  selector: 'app-button-dropdown',
  templateUrl: './button-dropdown.component.html',
  styleUrls: ['./button-dropdown.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(keydown)': '_handleKeydown($event)',

  },
  exportAs: 'btnDropDown'
})
export class ButtonDropdownComponent implements OnInit, AfterViewInit, OnDestroy {
  show = false;
  @ViewChild(DropDownBackdropComponent)  backdrop:  DropDownBackdropComponent;
  @ContentChildren(DropDownItemComponent) dropDownItem: QueryList<DropDownItemComponent>;
  @Output() dropdownClosed = new EventEmitter<void>();
  focusedElement: DropDownItemComponent;

  constructor( ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.backdrop.backdropClicked.subscribe(() => {
      const el = this.dropDownItem.toArray().slice().find((item) => {
        return item === this.focusedElement;
      });
      if (el) {
        el.removeFocus();
      }
      this.focusedElement = null;
      this.dropdownClosed.emit();
    });
  }

  public onClick(toggle: boolean) {
    this._toggleDropDown(toggle);
  }

  _toggleDropDown(toggle) {
    this.show = toggle;
  }

  _handleKeydown(event: KeyboardEvent): void {
      const keyCode = event.keyCode;

    // this.
    switch (keyCode) {
      case 27: // ESC
        const el = this.dropDownItem.toArray().slice().find((item) => {
          return item === this.focusedElement;
        });
        el.removeFocus();
        this.focusedElement = null;
        this.dropdownClosed.emit();
        event.preventDefault();
        break;
      default:
        if (keyCode === 38) {
          const reversed = this.dropDownItem.toArray().slice().reverse();
          if (!this.focusedElement) {
            const dropdownItem = reversed.find(item => {
              return !item.disabled && !item.highlighted;
            });
            if (dropdownItem) {
              this.focusedElement = dropdownItem;
              dropdownItem.focus(event);
            }
          } else {
             const index = reversed.slice().indexOf(this.focusedElement);
             const dropdownItem = reversed.slice(index + 1).find((item) => {
               return !item.disabled && !item.highlighted;
             });
             if (dropdownItem) {
               this.focusedElement.removeFocus();
               this.focusedElement = dropdownItem;
               dropdownItem.focus(event);
             }
          }
        }

        if (keyCode === 40) {
          if (!this.focusedElement) {
            const dropdownItemEl = this.dropDownItem.find((item) => {
              return !item.disabled && !item.highlighted;
            });
            if (dropdownItemEl) {
              this.focusedElement = dropdownItemEl;
              dropdownItemEl.focus(event);
            }
          } else {
            const dropdownItemEls = this.dropDownItem.toArray().slice(0);
            const index = dropdownItemEls.slice(0).indexOf(this.focusedElement);
            const dropdownItemEl = dropdownItemEls.slice(index + 1).find((item) => {
              return !item.disabled && !item.highlighted;
            });
            if (dropdownItemEl) {
              this.focusedElement.removeFocus();
              this.focusedElement = dropdownItemEl;
              dropdownItemEl.focus(event);
            }
          }
        }
    }
    }

 ngOnDestroy() {
   console.log('backdrop subscription destroyed');
   this.backdrop.backdropClicked.unsubscribe();
 }

}
