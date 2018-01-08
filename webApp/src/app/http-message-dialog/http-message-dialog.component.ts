import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'ca-http-message-dialog',
  templateUrl: './http-message-dialog.component.html',
  styleUrls: ['./http-message-dialog.component.css']
})
export class HttpMessageDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<HttpMessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}
