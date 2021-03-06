import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { BaseService } from "../base.service";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;

@Component({
  selector: "app-actions",
  templateUrl: "./actions.component.html",
})
export class ActionsComponent implements OnInit {
  @Input() actions;
  @Output() actionCompleted = new EventEmitter();
  formData: any = {};
  formValues: any = {};
  ArryValues: any = [];
  fields: any = [];
  formId: any;

  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    $("#formActionModal").on("hide.bs.modal", () => {
      this.resetFormValues();
    });
  }

  openForm(action) {
    let actionUrl = "/action/" + action.identifier;
    this.formId = action.identifier;
    this.baseService.get(actionUrl).subscribe((res) => {
      this.setFields(res);
      this.openActionModal();
    });
  }

  setFields(result) {
    this.formData = Object.assign({}, result);
    this.fields = this.formData["fields"];
  }

  openActionModal() {
    $("#formActionModal").modal("show");
  }

  onArryValueChange(e) {
    this.ArryValues = e.values;
  }

  closeActionModal() {
    $("#formActionModal").modal("hide");
    this.resetFormValues();
  }

  resetFormValues() {
    this.formId = null;
    this.formData = {};
    this.formValues = {};
    this.fields = [];
  }

  async updateVal(value, field, idx) {
    if (field.key) {
      if (field.type == "file") {
        value = await this.doFileUpload(value, field);
      }
      this.formValues[field.key] = value;
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

  saveForm() {
    let data;
    if (this.formData.type == "array") {
      data = Object.assign({}, this.ArryValues);
    } else {
      data = Object.assign({}, this.formValues);
    }
    let actionUrl = "/action-save/" + this.formId;
    let formValues = { identifier: this.formId, values: data };
    this.baseService.post(formValues, actionUrl).subscribe((res) => {
      if (res["actionCompleted"]) {
        this.actionCompleted.emit({ reload: true });
        this.closeActionModal();
      }
      if (!res["actionCompleted"]) {
        console.log("error while saving form happend ", res);
      }
    });
  }
}
