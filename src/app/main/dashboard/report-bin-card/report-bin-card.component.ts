import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-report-bin-card',
  templateUrl: './report-bin-card.component.html',
  styleUrls: ['./report-bin-card.component.scss']
})
export class ReportBinCardComponent implements OnInit {
    binCardForm: FormGroup;
    itemsArr = [
        {date: '12/06/2020', description: 'lorem ipsum', in: 12, unitCost: '1221', out: 6, balance: 6},
        {date: '13/06/2020', description: 'lorem ipsum2', in: 12, unitCost: '2221', out: 8, balance: 4}
    ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
      this.refresh();
  }

    refresh() {
        this.binCardForm = this.fb.group({
            openingDate: [''],
            closingDate: [''],
            itemId: [''],
            itemName: [''],
            store: ['']
        });
    }

}
