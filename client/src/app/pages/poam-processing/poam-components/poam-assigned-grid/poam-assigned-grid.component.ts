

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'vultrack-poam-assigned-grid',
  templateUrl: './poam-assigned-grid.component.html',
  styleUrls: ['./poam-assigned-grid.component.scss']
})
export class PoamAssignedGridComponent implements OnChanges {
  @Input() userId!: number;
  @Input() assignedData!: any[];
  @Input() assignedColumns!: string[];
  @Input() gridHeight!: string[];

  assignedDataSource!: NbTreeGridDataSource<any>;

  constructor(private router: Router, private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.assignedDataSource = this.dataSourceBuilder.create([]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['assignedData']) {
      this.updateDataSource();
    }
  }

  updateDataSource() {
    let data = this.assignedData;

    if (this.assignedColumns.includes('Approval Status')) {
      data = data.filter(item => {
        return item.approvers && item.approvers.some((approver: any) => approver.userId === this.userId && approver.approvalStatus != "Approved");
      });
    }

    data = data.map((item) => ({
      data: {
        poamId: item.poamId,
        adjSeverity: item.adjSeverity,
        status: item.status,
        submitter: item.submitterName,
        approvalStatus: item.approvers && item.approvers.find((approver: any) => approver.userId === this.userId)?.approvalStatus,
      },
    }));

    this.assignedDataSource.setData(data);
  }

  managePoam(row: any) {
    const poamId = row.data.poamId;
    this.router.navigateByUrl(`/poam-processing/poam-details/${poamId}`);
  }
}
