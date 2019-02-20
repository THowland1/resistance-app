import { Component } from '@angular/core';
import { AlertModalData } from './alert-modal-data';
import { BaseModal } from '../base-modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent extends BaseModal<AlertModalComponent, AlertModalData> {

}
