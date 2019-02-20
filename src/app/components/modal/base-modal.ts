import { BaseModalData } from "./base-modal-data";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";

/**
 * The base for all modal components to inherit from so they can carry the data needed for the the shell and close.
 *
 * The first type argument must be the class that is inheriting from the base.
 * 
 * The second type argument must be an interface that extends BaseModalData and be the type used in the inheriting class
 * @example class ExampleModalComponent extends BaseModal<ExampleModalComponent,ExampleModalData>
 */
export abstract class BaseModal<T,R extends BaseModalData> {
    constructor(
      public dialogRef: MatDialogRef<T>,
      @Inject(MAT_DIALOG_DATA) public dialogData: R) {}
  
    onClose(): void {
      this.dialogRef.close();
    }
  }