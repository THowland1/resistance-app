import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalType } from './modal-type.enum';

@Component({
  selector: 'app-modal-shell',
  templateUrl: './modal-shell.component.html',
  styleUrls: ['./modal-shell.component.scss']
})
export class ModalShellComponent {

  @Input() modalType: ModalType;
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  get modalTypeString(): string {
    switch (this.modalType) {
      case ModalType.info:
        return 'info'
      case ModalType.warn:
        return 'warn'
      case ModalType.error:
        return 'error'
      default:
        return '';
    }
  }

  onCloseClick(): void {
    this.close.emit();
  }

}

