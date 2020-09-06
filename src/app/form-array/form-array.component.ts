import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-form-array",
  templateUrl: "./form-array.component.html",
})
export class FormArrayComponent implements OnInit {
  @Output("onArrayValuesChange") onArrayValuesChange = new EventEmitter();
  @Input() fields;
  @Input()
  get values() {
    return this._values;
  }
  set values(vals) {
    if (!Array.isArray(vals)) {
      vals = vals ? [vals] : [];
    }
    this._values = vals;
  }
  _values = [];
  constructor() {}
  ngOnInit() {}

  addForm() {
    this.values.push({});
  }

  removeForm(frmIdx) {
    if (frmIdx > -1) {
      this.values.splice(frmIdx, 1);
    }
  }

  async updateVal(value, field, idx, frmIdx) {
    if (field.key) {
      if (field.type == "file") {
        value = await this.doFileUpload(value, field);
      }
      this.values[frmIdx][field.key] = value;
      this.onArrayValuesChange.next({
        values: this.values,
      });
    }
  }

  doFileUpload(event, field) {
    let file = event.target && event.target.files[0];
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          data: reader.result,
          filename: file.name,
        });
    });
  }
}
