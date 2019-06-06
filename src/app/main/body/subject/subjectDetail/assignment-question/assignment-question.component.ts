import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-assignment-question',
  templateUrl: './assignment-question.component.html',
  styleUrls: ['./assignment-question.component.scss']
})
export class AssignmentQuestionComponent implements OnInit {

  constructor(private translationLoader: FuseTranslationLoaderService,      private fuseConfig: FuseConfigService) {     this.fuseConfig.setSettings({
    layout: {
        navigation: 'top',
    toolbar   : 'above',
       footer    : 'none'
    }
});
}

  ngOnInit() {
  }

}
