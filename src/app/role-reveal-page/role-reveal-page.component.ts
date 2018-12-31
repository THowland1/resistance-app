import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-role-reveal-page',
  templateUrl: './role-reveal-page.component.html',
  styleUrls: ['./role-reveal-page.component.scss']
})
export class RoleRevealPageComponent implements OnInit {

  constructor(private _roleService: RoleService) { }

  ngOnInit() {
  }

  assignRoles() {
    this._roleService.assignRoles();
  }
}
