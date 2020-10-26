import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-monthly-activity',
  templateUrl: './monthly-activity.component.html',
  styleUrls: ['./monthly-activity.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MonthlyActivityComponent implements OnInit {
  panelOpenState = false;
  data = {
    "message": "Resource created/Updated",
    "data": {
        "revenue": [
            {
                "name": "Current Assets",
                "combinedCode": 31,
                "january": 0,
                "february": 0,
                "march": 0,
                "april": 0,
                "may": 100,
                "june": 0,
                "july": 0,
                "august": 200,
                "september": 0,
                "november": 0,
                "december": 0,
                "previousYears": 0,
                "total": 300,
                "child":[
                  {
                    "name": "Current Assets",
                    "combinedCode": 31,
                    "january": 0,
                    "february": 0,
                    "march": 0,
                    "april": 0,
                    "may": 100,
                    "june": 0,
                    "july": 0,
                    "august": 200,
                    "september": 0,
                    "november": 0,
                    "december": 0,
                    "previousYears": 0,
                    "total": 300,
                    "child":[
                      {
                        "name": "Current Assets",
                        "combinedCode": 31,
                        "january": 0,
                        "february": 0,
                        "march": 0,
                        "april": 0,
                        "may": 100,
                        "june": 0,
                        "july": 0,
                        "august": 200,
                        "september": 0,
                        "november": 0,
                        "december": 0,
                        "previousYears": 0,
                        "total": 300
                      },
                      {
                        "name": "Current Assets",
                        "combinedCode": 31,
                        "january": 0,
                        "february": 0,
                        "march": 0,
                        "april": 0,
                        "may": 100,
                        "june": 0,
                        "july": 0,
                        "august": 200,
                        "september": 0,
                        "november": 0,
                        "december": 0,
                        "previousYears": 0,
                        "total": 300,
                        "child":[
                          {
                            "name": "Current Assets",
                            "combinedCode": 31,
                            "january": 0,
                            "february": 0,
                            "march": 0,
                            "april": 0,
                            "may": 100,
                            "june": 0,
                            "july": 0,
                            "august": 200,
                            "september": 0,
                            "november": 0,
                            "december": 0,
                            "previousYears": 0,
                            "total": 300
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "name": "Current Assets",
                    "combinedCode": 31,
                    "january": 0,
                    "february": 0,
                    "march": 0,
                    "april": 0,
                    "may": 100,
                    "june": 0,
                    "july": 0,
                    "august": 200,
                    "september": 0,
                    "november": 0,
                    "december": 0,
                    "previousYears": 0,
                    "total": 300
                  }
                ]
            },
            {
                "name": "Non-Current Assets",
                "combinedCode": 32,
                "january": 0,
                "february": 0,
                "march": 0,
                "april": 0,
                "may": 100,
                "june": 0,
                "july": 0,
                "august": 200,
                "september": 0,
                "november": 0,
                "december": 0,
                "previousYears": 0,
                "total": 300
            }
        ]
    }
}
  constructor() { }

  ngOnInit(): void {
    //console.log("month",this.data)
  }

}
