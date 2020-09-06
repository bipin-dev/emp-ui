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

@Component({
  selector: "app-navs",
  templateUrl: "./navs.component.html",
})
export class NavsComponent implements OnInit {
  @Input() searchEnabled;
  @Output() autoComplete = new EventEmitter();
  navs: any = [];
  constructor(
    private baseService: BaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadNavs();
  }

  loadNavs() {
    let uri = "/navs";
    this.baseService.get(uri).subscribe((res) => {
      this.navs = res;
    });
  }

  doLogout() {
    if (confirm("Do you want to logout")) {
      this.baseService.logout("/logout").subscribe((res) => {
        if (res["status"] == "logged_out") {
          this.removeCache();
        }
      });
    }
  }

  removeCache() {
    this.baseService.removeCache();
    this.routeToLogin("/login");
  }

  routeToLogin(url) {
    this.router.navigate([url]);
  }

  autocompleteSearch(data) {
    this.autoComplete.emit(data);
  }
}
