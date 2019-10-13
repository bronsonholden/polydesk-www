import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FieldType } from '@ngx-formly/material';
import { SelectDialogService } from '../../../select-dialog.service';
import { FormSubmissionApiService } from '../../../form-submission-api.service';
import { JsonAccessorService } from '../../../json-accessor.service';

import { set, get, isNull } from 'lodash';

@Component({
  selector: 'app-form-widget-form-submission-reference',
  templateUrl: './form-widget-form-submission-reference.component.html',
  styleUrls: ['./form-widget-form-submission-reference.component.scss']
})
export class FormWidgetFormSubmissionReferenceComponent extends FieldType implements OnInit {

  formSubmission: any;
  formSubmissionCreating = false;
  // Options for inline forms
  inlineOptions: any = {};
  // Options for inline forms (creation only)
  inlineCreateOptions: any = {};
  // Store base inline model (if things are cleared, we want to repopulate them)
  _inlineModel: any = {};
  // Actual model passed to inline creation component
  inlineModel: any = {};

  constructor(private formSubmissionApiService: FormSubmissionApiService,
              private snackBar: MatSnackBar,
              private selectDialogService: SelectDialogService,
              private jsonAccessorService: JsonAccessorService) {
    super();
  }

  ngOnInit() {
    this.loadFormSubmission(this.formControl.value);

    this.formControl.valueChanges.subscribe(value => {
      this.loadFormSubmission(value);
    });

    const prereq = get(this.field, 'prerequisite');

    // If we have a prereq, clear this field anytime it changes
    if (prereq) {
      const prereqField = get(this.form.controls, prereq.field);
      if (prereqField) {
        prereqField.valueChanges.subscribe(val => {
          this.formControl.setValue(null);
          this.formSubmission = null;
        });
      }
    }

    // Hidden fields for inline forms
    this.inlineOptions.hidden = get(this.field, 'hideFields');

    const filters = get(this.field, 'filters', []);

    // When we have filters in place, we want to lock those values so
    // any submissions created inline are subject to those filters as well.
    filters.forEach((filter) => {
      const attr = filter.attribute.split('.').slice(1).join('.');
      const filterField = get(this.form.controls, attr);
      if (filterField) {
        filterField.valueChanges.subscribe(val => {
          set(this._inlineModel, attr, val);
          this.inlineCreateOptions.lockFields = this.inlineCreateOptions.lockFields || {};
          this.inlineCreateOptions.lockFields[attr] = val;
        });
      }
    });
  }

  loadFormSubmission(formSubmissionId) {
    if (formSubmissionId) {
      this.formSubmissionApiService.getFormSubmission(formSubmissionId).subscribe((result: any) => {
        this.formSubmission = result.data;
      });
    }
  }

  hasMissingDependencies() {
    const prereq = get(this.field, 'prerequisite');

    if (!prereq) {
      return false;
    }

    if (isNull(get(this.form.value, prereq.field))) {
      return true;
    }

    return false;
  }

  isLocked() {
    const lockFields = get(this.options, 'lockFields');
    if (lockFields) {
      return !isNull(lockFields[this.key]);
    }
    return false;
  }

  widgetSelectionDisabled() {
    return this.isLocked() || this.formState.disabled || this.hasMissingDependencies();
  }

  selectColor() {
    if (this.required) {
      return 'warn';
    } else {
      return '';
    }
  }

  clearFormSubmissionSelection() {
    this.formSubmission = null;
    this.formControl.setValue(null);
    this.formSubmissionCreating = false;
  }

  selectedFormSubmissionKey() {
    if (this.formSubmission) {
      const selectKey = get(this.field, 'selectKey');
      return this.jsonAccessorService.access(this.formSubmission.attributes, selectKey, '');
    }
  }

  getFormId() {
    return get(this.field, 'formId');
  }

  formSubmissionSelected() {
    return this.formSubmission;
  }

  createInlineFormSubmission(data) {
    if (get(this.options, 'allowCreateInline', false)) {
      return this.snackBar.open('Inline submission is disabled during preview', 'OK', {
        duration: 5000
      });
    }

    const formId = this.getFormId();

    this.formSubmissionApiService.createFormSubmission(formId, data.model, data.draft ? 'draft' : 'published').subscribe((result: any) => {
      this.formSubmissionCreating = false;
      this.formSubmission = result.data;
      this.formControl.setValue(result.data.id);
    }, (err: any) => {
      err.error.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  createNewInlineFormSubmission() {
    this.formSubmissionCreating = true;
    Object.assign(this.inlineModel, this._inlineModel);
  }

  // Dynamically resolve the value of an operand for a form submission
  // selection filter.
  resolveFilterOperand(filter) {
    switch (filter.operand.type) {
      case 'field':
        return get(this.form.value, filter.operand.value);
      case 'constant':
        return filter.operand.value;
    }
  }

  selectFormSubmission() {
    const formId = get(this.field, 'formId');
    const selectKey = get(this.field, 'selectKey');
    const selectFilters = get(this.field, 'filters', []);

    // Resolve filter operands
    const filters = selectFilters.reduce((result, filter) => {
      result[filter.attribute] = this.resolveFilterOperand(filter);
      return result;
    }, {});

    this.selectDialogService.selectFormSubmission({
      data: {
        formId,
        selectKey,
        filters
      },
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((res: any) => {
      if (res) {
        this.formSubmission = res;
        this.formControl.setValue(res.id);
      }
    });
  }

}
