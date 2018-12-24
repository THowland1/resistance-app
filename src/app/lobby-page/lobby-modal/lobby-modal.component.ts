import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-lobby-modal',
  templateUrl: './lobby-modal.component.html',
  styleUrls: ['./lobby-modal.component.scss']
})
export class LobbyModalComponent implements OnInit {

  name: FormControl;
  roomCode: FormControl;

  constructor(
    public dialogRef: MatDialogRef<LobbyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.roomCode = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);

    if (this.data.isNew) {
      this.roomCode.setValue('');
      this.roomCode.disable()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.name.invalid || this.roomCode.invalid) {
      return;
    }
    this.data.name = this.name.value;
    this.data.roomCode = (this.roomCode.value as string).toUpperCase();
    console.log(this.data);
    this.dialogRef.close(this.data);
  }
}
