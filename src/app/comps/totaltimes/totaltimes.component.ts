import { state } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';
import { HDate } from '@hebcal/core';
import { Times } from 'src/app/module/times';
import { AjaxService } from 'src/app/services/ajax.service';
import TableToExcel from "@linways/table-to-excel";





@Component({
  selector: 'app-totaltimes',
  templateUrl: './totaltimes.component.html',
  styleUrls: ['./totaltimes.component.css']
})

export class TotaltimesComponent implements OnInit {
 
  constructor(public srv: AjaxService) { }
  public gettimesmonth: Date = new Date()
  public times: Times[] = []
  

  displayedColumns: string[] = ['data', 'hdata','day', 'start', 'end', 'sumtimer'];
  // dataSource = this.times

  ngOnInit(): void {
    this.srv.httppost('/api/getlisttimesforuser', { user: this.srv.user, months: this.gettimesmonth.getMonth() + 1, your: this.gettimesmonth.getFullYear() })
      .subscribe(response => {
        response.forEach(function (element: any) {
          var h = new Date(element.start)
          element.start = `${(new Date(element.start).getHours() < 10) ? '0' + new Date(element.start).getHours() : new Date(element.start).getHours()}:${(new Date(element.start).getMinutes() < 10) ? '0' + new Date(element.start).getMinutes() : new Date(element.start).getMinutes()}:${(new Date(element.start).getSeconds() < 10) ? '0' + new Date(element.start).getSeconds() : new Date(element.start).getSeconds()}`
          element.end = `${(new Date(element.end).getHours() < 10) ? '0' + new Date(element.end).getHours() : new Date(element.end).getHours()}:${(new Date(element.end).getMinutes() < 10) ? '0' + new Date(element.end).getMinutes() : new Date(element.end).getMinutes()}:${(new Date(element.end).getSeconds() < 10) ? '0' + new Date(element.end).getSeconds() : new Date(element.end).getSeconds()}`
          console.log('h: ' ,h);
          switch (h.getDay()) {
            case 0:
              element.day = "ראשון";
              break;
            case 1:
              element.day = "שני";
              break;
            case 2:
              element.day = "שלישי";
              break;
            case 3:
              element.day = "רביעי";
              break;
            case 4:
              element.day = "חמישי";
              break;
            case 5:
              element.day = "שישי";
              break;
            case 6:
              element.day = "שבת";
          }
          element.hdata = new HDate(h).renderGematriya()
        });
        this.times = response

        console.log(response)
      })
  }
  public export(): void {
    let table = document.querySelector("#teb");
    TableToExcel.convert(table, {
      name: "שעות עבודה.xlsx",
      sheet: {
        name: "פירוט",
      },
    });
  }


}
// export class TableBasicExample {
//   displayedColumns: string[] = ['תאריך', 'שעת התחלה', 'שעת סיום', 'סך שעות'];
//   dataSource = [{}]
// }
