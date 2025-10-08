import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MoneyPipe } from '@kickbase/definitions';
import { CurrencyPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-transfer-market-bid-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MoneyPipe,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
  ],
  providers: [CurrencyPipe],
  templateUrl: './TransferMarketBidDialog.html',
  styleUrl: './TransferMarketBidDialog.scss',
})
export class TransferMarketBidDialog {
  data: TransferMarketInputBidData = inject(MAT_DIALOG_DATA);
  dialogRef: MatDialogRef<TransferMarketBidDialog> = inject(
    MatDialogRef<TransferMarketBidDialog>
  );

  currentBid = this.data.currentBid;

  clearBidDialog() {
    this.dialogRef.close({
      playerName: this.data.playerName,
      marketValue: this.data.marketValue,
      currentBid: 0,
      status: TransferMarketBidDialogStatus.CLEAR,
    } as TransferMarketOutputBidData);
  }

  cancelDialog() {
    this.dialogRef.close({
      playerName: this.data.playerName,
      marketValue: this.data.marketValue,
      currentBid: this.data.currentBid,
      status: TransferMarketBidDialogStatus.CANCEL,
    } as TransferMarketOutputBidData);
  }

  acceptBid() {
    this.dialogRef.close({
      playerName: this.data.playerName,
      marketValue: this.data.marketValue,
      currentBid: this.currentBid,
      status: TransferMarketBidDialogStatus.ACCEPT,
    } as TransferMarketOutputBidData);
  }
}

export interface TransferMarketInputBidData {
  playerName: string;
  marketValue: number;
  currentBid: number;
}

export interface TransferMarketOutputBidData
  extends TransferMarketInputBidData {
  status: TransferMarketBidDialogStatus;
}

export enum TransferMarketBidDialogStatus {
  CLEAR,
  CANCEL,
  ACCEPT,
}
