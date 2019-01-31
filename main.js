(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<app-session-info-bar [session]=\"session\" [player]=\"player\" [players]=\"players\"></app-session-info-bar>\r\n<div class=\"container\">\r\n\r\n  <div *ngIf=\"canSeeGameBoard\" class=\"d-flex justify-content-center\">\r\n    <app-game-board></app-game-board>\r\n  </div>\r\n  \r\n  <router-outlet></router-outlet>\r\n  \r\n  <div class=\"d-flex justify-content-center\">\r\n    <app-lobby-page\r\n      *ngIf=\"stageIsVisible(Stage.NotBegun)\"\r\n      (joinedServer)=\"joinedServer($event)\"></app-lobby-page>\r\n    <app-role-reveal-page\r\n      *ngIf=\"stageIsVisible(Stage.RoleReveal)\"\r\n      [playerName]=\"session.name\"\r\n      (playersAssigned)=\"playersAssigned($event)\"></app-role-reveal-page>\r\n    <app-team-pick-page\r\n      *ngIf=\"stageIsVisible(Stage.TeamPick)\"\r\n      [playerName]=\"session.name\"\r\n      [players]=\"players\"\r\n      ></app-team-pick-page>\r\n    <app-vote-page\r\n      *ngIf=\"stageIsVisible(Stage.Vote)\"\r\n      [playerName]=\"session.name\"\r\n      [players]=\"players\"\r\n      ></app-vote-page>\r\n    <app-mission-page\r\n      *ngIf=\"stageIsVisible(Stage.Mission)\"\r\n      [playerName]=\"session.name\"\r\n      [players]=\"players\"\r\n      ></app-mission-page>\r\n    <app-game-over-page\r\n      *ngIf=\"stageIsVisible(Stage.GameOver)\"\r\n      [playerName]=\"session.name\"\r\n      [players]=\"players\"\r\n      ></app-game-over-page>\r\n  </div>\r\n\r\n  <app-dev \r\n    (joinedServer)=\"joinedServer($event)\"\r\n    (playersAssigned)=\"playersAssigned($event)\"></app-dev>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var src_services_nav_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/nav.service */ "./src/services/nav.service.ts");
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
/* harmony import */ var src_enums_role_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/enums/role.enum */ "./src/enums/role.enum.ts");
/* harmony import */ var src_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/functions */ "./src/functions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = /** @class */ (function () {
    function AppComponent(_navService) {
        this._navService = _navService;
        this.title = 'resistance-app';
        this.Stage = src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_1__["Stage"];
        this.stage = src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_1__["Stage"].NotBegun;
        this.teamPipe = src_enums_team_enum__WEBPACK_IMPORTED_MODULE_3__["teamPipe"];
        this.rolePipe = src_enums_role_enum__WEBPACK_IMPORTED_MODULE_4__["rolePipe"];
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.stageIsVisible = function (stage) {
        return this.stage === stage;
    };
    AppComponent.prototype.goToStage = function (stage) {
        this._navService.goToStage(stage);
    };
    AppComponent.prototype.joinedServer = function (session) {
        this._navService.connectToRoom(session.roomCode);
        this._navService.currentStage.subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_5__["bind"])(this, 'stage'));
        this.session = session;
    };
    AppComponent.prototype.playersAssigned = function (players) {
        var _this = this;
        this.players = players;
        this.player = !!players
            ? players.filter(function (player) { return player.name === _this.session.name; })[0]
            : null;
    };
    Object.defineProperty(AppComponent.prototype, "canSeeGameBoard", {
        get: function () {
            var _this = this;
            var unallowedStages = [src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_1__["Stage"].NotBegun, src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_1__["Stage"].RoleReveal];
            return !unallowedStages.some(function (unallowedStage) { return unallowedStage === _this.stage; });
        },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_nav_service__WEBPACK_IMPORTED_MODULE_2__["NavService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/fesm5/service-worker.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _lobby_page_lobby_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lobby-page/lobby-page.component */ "./src/app/lobby-page/lobby-page.component.ts");
/* harmony import */ var _role_reveal_page_role_reveal_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./role-reveal-page/role-reveal-page.component */ "./src/app/role-reveal-page/role-reveal-page.component.ts");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/fire */ "./node_modules/@angular/fire/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _dev_dev_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dev/dev.component */ "./src/app/dev/dev.component.ts");
/* harmony import */ var _team_pick_page_team_pick_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./team-pick-page/team-pick-page.component */ "./src/app/team-pick-page/team-pick-page.component.ts");
/* harmony import */ var _vote_page_vote_page_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./vote-page/vote-page.component */ "./src/app/vote-page/vote-page.component.ts");
/* harmony import */ var _mission_page_mission_page_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mission-page/mission-page.component */ "./src/app/mission-page/mission-page.component.ts");
/* harmony import */ var _game_board_game_board_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./game-board/game-board.component */ "./src/app/game-board/game-board.component.ts");
/* harmony import */ var _game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./game-over-page/game-over-page.component */ "./src/app/game-over-page/game-over-page.component.ts");
/* harmony import */ var _session_info_bar_session_info_bar_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./session-info-bar/session-info-bar.component */ "./src/app/session-info-bar/session-info-bar.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _lobby_page_lobby_page_component__WEBPACK_IMPORTED_MODULE_6__["LobbyPageComponent"],
                _role_reveal_page_role_reveal_page_component__WEBPACK_IMPORTED_MODULE_7__["RoleRevealPageComponent"],
                _dev_dev_component__WEBPACK_IMPORTED_MODULE_13__["DevComponent"],
                _team_pick_page_team_pick_page_component__WEBPACK_IMPORTED_MODULE_14__["TeamPickPageComponent"],
                _vote_page_vote_page_component__WEBPACK_IMPORTED_MODULE_15__["VotePageComponent"],
                _mission_page_mission_page_component__WEBPACK_IMPORTED_MODULE_16__["MissionPageComponent"],
                _game_board_game_board_component__WEBPACK_IMPORTED_MODULE_17__["GameBoardComponent"],
                _game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_18__["GameOverPageComponent"],
                _session_info_bar_session_info_bar_component__WEBPACK_IMPORTED_MODULE_19__["SessionInfoBarComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_service_worker__WEBPACK_IMPORTED_MODULE_4__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].production }),
                _angular_fire__WEBPACK_IMPORTED_MODULE_9__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].firebase),
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCheckboxModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_20__["FontAwesomeModule"]
            ],
            providers: [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_8__["AngularFirestore"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dev/dev.component.html":
/*!****************************************!*\
  !*** ./src/app/dev/dev.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"devAreaVisible\" class=\"dev-area row\">\n  <h4 class=\"text-danger\">Dev functions</h4>\n  <form class=\"col-12 my-1\">\n    <span>Join room</span>\n    <input type=\"text\" placeholder=\"Name\" [(ngModel)]=\"hijackName\" name=\"name\">\n    <input type=\"text\" placeholder=\"RoomCode\" [(ngModel)]=\"hijackRoomCode\" name=\"roomCode\">\n    <button (click)=\"hijackClick()\">Go!</button>\n  </form>\n  <form class=\"col-12 my-1\">\n    <span>Create new room</span>\n    <input type=\"text\" placeholder=\"RoomCode\" [(ngModel)]=\"createRoomCode\" name=\"roomCode\">\n    <input type=\"number\" placeholder=\"Number of Players\" [(ngModel)]=\"createNoOfPlayers\" name=\"noOfPlayers\">\n    <button (click)=\"createClick()\">Go!</button>\n  </form>\n  <form class=\"col-12 my-1\">\n    <span>Reset room</span>\n    <input type=\"text\" placeholder=\"RoomCode\" [(ngModel)]=\"resetRoomCode\" name=\"roomCode\">\n    <button (click)=\"resetClick()\">Go!</button>\n  </form>\n  <form class=\"col-12 my-1\">\n      <span>Upvote/downvote room</span>\n      <input type=\"text\" placeholder=\"RoomCode\" [(ngModel)]=\"upvoteRoomCode\" name=\"roomCode\">\n      <button (click)=\"upOrDownvoteClick(true)\">Upvote!</button>\n      <button (click)=\"upOrDownvoteClick(false)\">Downvote!</button>\n    </form>\n</div>\n<div *ngIf=\"!devAreaVisible\" style=\"text-align: center; color: lightgray\">\n  <hr>\n  <fa-icon [icon]=faCoffee (click)=clickTheCoffee()></fa-icon>\n</div>"

/***/ }),

/***/ "./src/app/dev/dev.component.scss":
/*!****************************************!*\
  !*** ./src/app/dev/dev.component.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dev-area {\n  margin: 32px;\n  border: 2px solid red;\n  border-radius: 2px; }\n  .dev-area span {\n    display: inline-block;\n    width: 30%;\n    text-align: right;\n    padding: 2px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGV2L0M6XFxVc2Vyc1xcdXNlclxcUHJvamVjdHNcXHJlc2lzdGFuY2UtYXBwL3NyY1xcYXBwXFxkZXZcXGRldi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQVk7RUFDWixzQkFBcUI7RUFDckIsbUJBQWtCLEVBUXJCO0VBWEQ7SUFNUSxzQkFBcUI7SUFDckIsV0FBVTtJQUNWLGtCQUFpQjtJQUNqQixhQUFZLEVBQ2QiLCJmaWxlIjoic3JjL2FwcC9kZXYvZGV2LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRldi1hcmVhe1xyXG4gICAgbWFyZ2luOiAzMnB4O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgcmVkO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG5cclxuICAgIHNwYW4ge1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICB3aWR0aDogMzAlO1xyXG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICAgIHBhZGRpbmc6IDJweDtcclxuICAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/dev/dev.component.ts":
/*!**************************************!*\
  !*** ./src/app/dev/dev.component.ts ***!
  \**************************************/
/*! exports provided: DevComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevComponent", function() { return DevComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/base.service */ "./src/services/base.service.ts");
/* harmony import */ var src_services_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/login.service */ "./src/services/login.service.ts");
/* harmony import */ var src_services_role_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/services/role.service */ "./src/services/role.service.ts");
/* harmony import */ var src_services_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/services/nav.service */ "./src/services/nav.service.ts");
/* harmony import */ var src_models_game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/models/game */ "./src/models/game.ts");
/* harmony import */ var src_models_player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/models/player */ "./src/models/player.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/enums/vote.enum */ "./src/enums/vote.enum.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DevComponent = /** @class */ (function () {
    function DevComponent(_route, base, _navService, _loginService, _roleService) {
        this._route = _route;
        this.base = base;
        this._navService = _navService;
        this._loginService = _loginService;
        this._roleService = _roleService;
        this.joinedServer = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.playersAssigned = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.faCoffee = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCoffee"];
        this.devAreaVisible = false;
        this.devAreaEnabled = false;
        // Click the coffee
        this.coffeeClicks = 0;
    }
    DevComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.queryParams.subscribe(function (params) { _this.devAreaEnabled = params.dev; });
    };
    DevComponent.prototype.hijackClick = function () {
        var _this = this;
        var name = this.hijackName;
        var roomCode = this.hijackRoomCode;
        this.joinedServer.emit({ name: name, roomCode: roomCode });
        this.base.getCollection('player').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])()).subscribe(function (players) {
            _this.playersAssigned.emit(players);
        });
    };
    DevComponent.prototype.clickTheCoffee = function () {
        if (!this.devAreaEnabled) {
            return;
        }
        this.coffeeClicks++;
        if (this.coffeeClicks > 2) {
            this.devAreaVisible = true;
        }
    };
    DevComponent.prototype.createClick = function () {
        var roomCode = this.createRoomCode;
        var noOfPlayers = this.createNoOfPlayers;
        var playerNames = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj'];
        console.log("Creating room " + roomCode + " with " + noOfPlayers + " players");
        this.base.addGame(roomCode, Object(src_models_game__WEBPACK_IMPORTED_MODULE_5__["newGame"])());
        for (var index = 0; index < noOfPlayers; index++) {
            var name_1 = playerNames[index];
            this.base.addDoc('player', Object(src_models_player__WEBPACK_IMPORTED_MODULE_6__["newPlayer"])(name_1), name_1, roomCode);
        }
    };
    DevComponent.prototype.resetClick = function () {
        var roomCode = this.resetRoomCode;
        this.base.addGame(roomCode, Object(src_models_game__WEBPACK_IMPORTED_MODULE_5__["newGame"])());
    };
    DevComponent.prototype.upOrDownvoteClick = function (upOrDown) {
        var _this = this;
        var roomCode = this.upvoteRoomCode;
        var vote = upOrDown ? src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_8__["Vote"].upvoted : src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_8__["Vote"].downvoted;
        this.base.getCollectionCount('player')
            .subscribe(function (count) {
            _this.base.updateGameProperty('votes', new Array(count).fill(vote));
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DevComponent.prototype, "joinedServer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DevComponent.prototype, "playersAssigned", void 0);
    DevComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dev',
            template: __webpack_require__(/*! ./dev.component.html */ "./src/app/dev/dev.component.html"),
            styles: [__webpack_require__(/*! ./dev.component.scss */ "./src/app/dev/dev.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"],
            src_services_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"],
            src_services_nav_service__WEBPACK_IMPORTED_MODULE_4__["NavService"],
            src_services_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"],
            src_services_role_service__WEBPACK_IMPORTED_MODULE_3__["RoleService"]])
    ], DevComponent);
    return DevComponent;
}());



/***/ }),

/***/ "./src/app/game-board/game-board.component.html":
/*!******************************************************!*\
  !*** ./src/app/game-board/game-board.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isLoading\">\n  <hr>\n  <h6>Mission Tracker</h6>\n  <div class=\"flex\">\n    <span class=\"mission circle\" [ngClass]=\"[outcomeCss(outcome), twoFailCss(i), currentCss(i)]\" *ngFor=\"let outcome of missionOutcomes; let i = index;\">\n        {{missionSizes[i].size}}\n    </span>\n  </div>\n  <hr>\n  <h6>Vote Tracker</h6>\n  <div class=\"flex\">\n      <span class=\"vote circle\" [ngClass]=\"{'downvoted': noOfDownvotedTeams >= votecount, 'current': noOfDownvotedTeams === votecount - 1}\" *ngFor=\"let votecount of voteCountArray\">\n          {{votecount}}\n      </span>\n    </div>\n    <hr>\n</div>\n\n<div *ngIf=\"isLoading\">Game board loading...</div>"

/***/ }),

/***/ "./src/app/game-board/game-board.component.scss":
/*!******************************************************!*\
  !*** ./src/app/game-board/game-board.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".circle {\n  display: inline-block;\n  border-radius: 50%;\n  position: relative;\n  text-align: center;\n  line-height: 1.5em;\n  color: white; }\n  .circle.current::before {\n    content: ' ';\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #777;\n    position: absolute;\n    bottom: -5px; }\n  .circle.current.mission::before {\n    left: calc(50px / 2 - 5px); }\n  .circle.current.vote::before {\n    left: calc(30px / 2 - 5px); }\n  .circle.mission {\n    width: 50px;\n    height: 50px;\n    font-size: calc(0.6 * 50px); }\n  .circle.mission.notstarted {\n      background-color: #aaa; }\n  .circle.mission.passed {\n      background-color: #aaf; }\n  .circle.mission.failed {\n      background-color: #faa; }\n  .circle.mission.twofail {\n      text-decoration: underline; }\n  .circle.vote {\n    width: 30px;\n    height: 30px;\n    font-size: calc(0.6 * 30px);\n    background-color: #aaa; }\n  .circle.vote.downvoted {\n      background-color: #faa; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2FtZS1ib2FyZC9DOlxcVXNlcnNcXHVzZXJcXFByb2plY3RzXFxyZXNpc3RhbmNlLWFwcC9zcmNcXGFwcFxcZ2FtZS1ib2FyZFxcZ2FtZS1ib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQTtFQUNJLHNCQUFxQjtFQUNyQixtQkFBa0I7RUFDbEIsbUJBQWtCO0VBQ2xCLG1CQUFrQjtFQUNsQixtQkFBa0I7RUFDbEIsYUFBWSxFQTJEZjtFQWpFRDtJQVVZLGFBQVk7SUFDWixtQ0FBa0Q7SUFDbEQsb0NBQW1EO0lBQ25ELDhCQWhCZTtJQWlCZixtQkFBa0I7SUFDbEIsYUFuQlksRUFvQmI7RUFoQlg7SUFvQmdCLDJCQUFvRSxFQUN2RTtFQXJCYjtJQTBCZ0IsMkJBQWlFLEVBQ3BFO0VBM0JiO0lBaUNRLFlBdkNzQjtJQXdDdEIsYUF4Q3NCO0lBeUN0Qiw0QkFBa0QsRUFpQnJEO0VBcERMO01Bc0NZLHVCQS9DSyxFQWdEUjtFQXZDVDtNQTBDWSx1QkFsREMsRUFtREo7RUEzQ1Q7TUE4Q1ksdUJBckRDLEVBc0RKO0VBL0NUO01Ba0RZLDJCQUEwQixFQUM3QjtFQW5EVDtJQXdEUSxZQTdEbUI7SUE4RG5CLGFBOURtQjtJQStEbkIsNEJBQStDO0lBQy9DLHVCQXBFUyxFQXlFWjtFQWhFTDtNQThEWSx1QkFyRUMsRUFzRUoiLCJmaWxlIjoic3JjL2FwcC9nYW1lLWJvYXJkL2dhbWUtYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkbm90c3RhcnRlZDogI2FhYTtcclxuJHBhc3NlZDogI2FhZjtcclxuJGZhaWxlZDogI2ZhYTtcclxuJG1pc3Npb24tY2lyY2xlLWRpYW1ldGVyOiA1MHB4O1xyXG4kdm90ZS1jaXJjbGUtZGlhbWV0ZXI6IDMwcHg7XHJcbiRjdXJyZW50LWFycm93LXNpemU6IDVweDtcclxuJGN1cnJlbnQtYXJyb3ctY29sb3VyOiAjNzc3O1xyXG5cclxuXHJcbi5jaXJjbGUge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG5cclxuICAgICYuY3VycmVudCB7XHJcbiAgICAgICAgJjo6YmVmb3JlIHtcclxuICAgICAgICAgICAgY29udGVudDogJyAnO1xyXG4gICAgICAgICAgICBib3JkZXItbGVmdDogJGN1cnJlbnQtYXJyb3ctc2l6ZSBzb2xpZCB0cmFuc3BhcmVudDtcclxuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAkY3VycmVudC1hcnJvdy1zaXplIHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAkY3VycmVudC1hcnJvdy1zaXplIHNvbGlkICRjdXJyZW50LWFycm93LWNvbG91cjtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICBib3R0b206IC0kY3VycmVudC1hcnJvdy1zaXplO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAmLm1pc3Npb24ge1xyXG4gICAgICAgICAgICAmOjpiZWZvcmV7XHJcbiAgICAgICAgICAgICAgICBsZWZ0OiBjYWxjKCN7JG1pc3Npb24tY2lyY2xlLWRpYW1ldGVyfSAvIDIgLSAjeyRjdXJyZW50LWFycm93LXNpemV9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICYudm90ZSB7XHJcbiAgICAgICAgICAgICY6OmJlZm9yZXtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IGNhbGMoI3skdm90ZS1jaXJjbGUtZGlhbWV0ZXJ9IC8gMiAtICN7JGN1cnJlbnQtYXJyb3ctc2l6ZX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgICYubWlzc2lvbntcclxuICAgICAgICB3aWR0aDogJG1pc3Npb24tY2lyY2xlLWRpYW1ldGVyO1xyXG4gICAgICAgIGhlaWdodDogJG1pc3Npb24tY2lyY2xlLWRpYW1ldGVyO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygwLjYgKiAjeyRtaXNzaW9uLWNpcmNsZS1kaWFtZXRlcn0pO1xyXG5cclxuICAgICAgICAmLm5vdHN0YXJ0ZWR7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRub3RzdGFydGVkO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICYucGFzc2Vke1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcGFzc2VkO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICYuZmFpbGVke1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZmFpbGVkO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICYudHdvZmFpbCB7XHJcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgICYudm90ZSB7XHJcbiAgICAgICAgd2lkdGg6ICR2b3RlLWNpcmNsZS1kaWFtZXRlcjtcclxuICAgICAgICBoZWlnaHQ6ICR2b3RlLWNpcmNsZS1kaWFtZXRlcjtcclxuICAgICAgICBmb250LXNpemU6IGNhbGMoMC42ICogI3skdm90ZS1jaXJjbGUtZGlhbWV0ZXJ9KTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbm90c3RhcnRlZDtcclxuXHJcbiAgICAgICAgJi5kb3dudm90ZWR7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmYWlsZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/game-board/game-board.component.ts":
/*!****************************************************!*\
  !*** ./src/app/game-board/game-board.component.ts ***!
  \****************************************************/
/*! exports provided: GameBoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameBoardComponent", function() { return GameBoardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/game.service */ "./src/services/game.service.ts");
/* harmony import */ var src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/enums/mission-outcome */ "./src/enums/mission-outcome.ts");
/* harmony import */ var src_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/functions */ "./src/functions.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_game_variables__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/game.variables */ "./src/game.variables.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GameBoardComponent = /** @class */ (function () {
    function GameBoardComponent(_gameService) {
        this._gameService = _gameService;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    GameBoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._gameService.missionOutcomes
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroy$))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_3__["bind"])(this, 'missionOutcomes'));
        this._gameService.noOfDownvotedTeams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroy$))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_3__["bind"])(this, 'noOfDownvotedTeams'));
        this._gameService.currentMission
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.destroy$))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_3__["bind"])(this, 'currentMission'));
        this._gameService.playerCount
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
            .subscribe(function (count) { return _this.missionSizes = src_game_variables__WEBPACK_IMPORTED_MODULE_6__["gameVariables"].missionSizes[count - 5]; });
    };
    Object.defineProperty(GameBoardComponent.prototype, "voteCountArray", {
        get: function () {
            var maxNoOfVotes = src_game_variables__WEBPACK_IMPORTED_MODULE_6__["gameVariables"].maxNoOfVotesPerMission;
            // Creates an array of [1,2,...,maxNoOfVotes]
            return new Array(maxNoOfVotes).fill(null).map(function (_, index) { return index + 1; });
        },
        enumerable: true,
        configurable: true
    });
    GameBoardComponent.prototype.outcomeCss = function (missionOutcome) {
        switch (missionOutcome) {
            case src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_2__["MissionOutcome"].notStarted:
                return 'notstarted';
            case src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_2__["MissionOutcome"].pass:
                return 'passed';
            case src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_2__["MissionOutcome"].fail:
                return 'failed';
            default:
                return '';
        }
    };
    GameBoardComponent.prototype.twoFailCss = function (missionIndex) {
        var missionSize = this.missionSizes[missionIndex];
        return missionSize.twoFail ? 'twofail' : '';
    };
    GameBoardComponent.prototype.currentCss = function (missionIndex) {
        return this.currentMission === missionIndex ? 'current' : '';
    };
    Object.defineProperty(GameBoardComponent.prototype, "isLoading", {
        get: function () {
            return [this.missionOutcomes,
                this.missionSizes,
                this.noOfDownvotedTeams,
                this.currentMission].some(function (prop) { return prop === undefined; });
        },
        enumerable: true,
        configurable: true
    });
    GameBoardComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    GameBoardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-game-board',
            template: __webpack_require__(/*! ./game-board.component.html */ "./src/app/game-board/game-board.component.html"),
            styles: [__webpack_require__(/*! ./game-board.component.scss */ "./src/app/game-board/game-board.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]])
    ], GameBoardComponent);
    return GameBoardComponent;
}());



/***/ }),

/***/ "./src/app/game-over-page/game-over-page.component.html":
/*!**************************************************************!*\
  !*** ./src/app/game-over-page/game-over-page.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isLoading\">\n  <p>The game is over.</p>\n  <p>Winning team: {{winningTeam}}</p>\n  <p>How: {{gameOutcomeMessage}}</p>\n</div>\n\n<div *ngIf=\"isLoading\">\n    Loading...\n</div>"

/***/ }),

/***/ "./src/app/game-over-page/game-over-page.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/game-over-page/game-over-page.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2dhbWUtb3Zlci1wYWdlL2dhbWUtb3Zlci1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/game-over-page/game-over-page.component.ts":
/*!************************************************************!*\
  !*** ./src/app/game-over-page/game-over-page.component.ts ***!
  \************************************************************/
/*! exports provided: GameOverPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameOverPageComponent", function() { return GameOverPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/game.service */ "./src/services/game.service.ts");
/* harmony import */ var src_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/functions */ "./src/functions.ts");
/* harmony import */ var src_enums_game_outcome_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/enums/game-outcome.enum */ "./src/enums/game-outcome.enum.ts");
/* harmony import */ var src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/enums/mission-outcome */ "./src/enums/mission-outcome.ts");
/* harmony import */ var src_game_variables__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/game.variables */ "./src/game.variables.ts");
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GameOverPageComponent = /** @class */ (function () {
    function GameOverPageComponent(_gameService) {
        this._gameService = _gameService;
    }
    GameOverPageComponent.prototype.ngOnInit = function () {
        this._gameService.getGame.subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_2__["bind"])(this, 'game'));
    };
    Object.defineProperty(GameOverPageComponent.prototype, "gameOutcome", {
        get: function () {
            if (!this.game) {
                return;
            }
            var passingMissions = this.game.missionOutcomes.filter(function (outcome) { return outcome === src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_4__["MissionOutcome"].pass; }).length;
            var failingMissions = this.game.missionOutcomes.filter(function (outcome) { return outcome === src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_4__["MissionOutcome"].fail; }).length;
            var downvotedMissions = this.game.noOfDownvotedTeams;
            if (passingMissions >= src_game_variables__WEBPACK_IMPORTED_MODULE_5__["gameVariables"].noOfMissionsToWin) {
                return src_enums_game_outcome_enum__WEBPACK_IMPORTED_MODULE_3__["GameOutcome"].sufficientSuccesses;
            }
            if (failingMissions >= src_game_variables__WEBPACK_IMPORTED_MODULE_5__["gameVariables"].noOfMissionsToWin) {
                return src_enums_game_outcome_enum__WEBPACK_IMPORTED_MODULE_3__["GameOutcome"].sufficientFailures;
            }
            if (downvotedMissions >= src_game_variables__WEBPACK_IMPORTED_MODULE_5__["gameVariables"].maxNoOfVotesPerMission) {
                return src_enums_game_outcome_enum__WEBPACK_IMPORTED_MODULE_3__["GameOutcome"].tooManyDownvotes;
            }
            console.error('An error has occurred');
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameOverPageComponent.prototype, "gameOutcomeMessage", {
        get: function () {
            return Object(src_enums_game_outcome_enum__WEBPACK_IMPORTED_MODULE_3__["GameOutcomeMessagePipe"])(this.gameOutcome);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameOverPageComponent.prototype, "winningTeam", {
        get: function () {
            var winningTeam = Object(src_enums_game_outcome_enum__WEBPACK_IMPORTED_MODULE_3__["GameOutcomeWinnerPipe"])(this.gameOutcome);
            return Object(src_enums_team_enum__WEBPACK_IMPORTED_MODULE_6__["teamPipe"])(winningTeam);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameOverPageComponent.prototype, "isLoading", {
        get: function () {
            return [this.game].some(function (prop) { return prop === undefined; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], GameOverPageComponent.prototype, "playerName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], GameOverPageComponent.prototype, "players", void 0);
    GameOverPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-game-over-page',
            template: __webpack_require__(/*! ./game-over-page.component.html */ "./src/app/game-over-page/game-over-page.component.html"),
            styles: [__webpack_require__(/*! ./game-over-page.component.scss */ "./src/app/game-over-page/game-over-page.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]])
    ], GameOverPageComponent);
    return GameOverPageComponent;
}());



/***/ }),

/***/ "./src/app/lobby-page/lobby-page.component.html":
/*!******************************************************!*\
  !*** ./src/app/lobby-page/lobby-page.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"lobby-form\" *ngIf=\"!isConnectedToARoom\">\r\n  <form class=\"d-block\">\r\n    <mat-form-field class=\"d-block\">\r\n      <input matInput [formControl]=\"name\" placeholder=\"Name\">\r\n      <mat-error *ngIf=\"name.invalid\">Please pick a longer name</mat-error>\r\n    </mat-form-field>\r\n    <mat-form-field *ngIf=\"!isNew\" class=\"d-block\">\r\n      <input matInput [formControl]=\"roomCode\" placeholder=\"Room code\" style=\"text-transform: uppercase;\" maxlength=\"4\">\r\n      <mat-error *ngIf=\"roomCode.invalid\">Room codes have 4 characters</mat-error>\r\n    </mat-form-field>\r\n    <mat-checkbox class=\"d-block\" [(ngModel)]=\"isNew\" name=\"isNew\">New Lobby?</mat-checkbox>\r\n    <button class=\"d-block\" *ngIf=\"!isConnectedToARoom\" [disabled]=\"canCreateOrJoinLobby\" (click)=\"createOrJoinLobby()\">\r\n      {{isNew ? 'Create' : 'Join'}} lobby\r\n    </button>\r\n  </form>\r\n</div>\r\n    \r\n<div class=\"start-game-buttons\" *ngIf=\"isConnectedToARoom\">\r\n  <button *ngIf=\"countDownTimer == null\" [disabled]=\"!canStartGame\" (click)=\"startGame()\">Start game</button>\r\n  <button *ngIf=\"countDownTimer != null\" (click)=\"cancelGame()\">Cancel</button>\r\n  <p>{{countDownTimer}}</p>\r\n</div>\r\n\r\n<div class=\"current-lobby\" *ngIf=\"isConnectedToARoom\">\r\n  <h4>Current lobby</h4>\r\n  <ul *ngFor=\"let item of lobbyPeople\">\r\n    <li>{{item}}</li>\r\n  </ul>\r\n</div>"

/***/ }),

/***/ "./src/app/lobby-page/lobby-page.component.scss":
/*!******************************************************!*\
  !*** ./src/app/lobby-page/lobby-page.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvYmJ5LXBhZ2UvbG9iYnktcGFnZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/lobby-page/lobby-page.component.ts":
/*!****************************************************!*\
  !*** ./src/app/lobby-page/lobby-page.component.ts ***!
  \****************************************************/
/*! exports provided: LobbyPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LobbyPageComponent", function() { return LobbyPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/login.service */ "./src/services/login.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_services_nav_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/services/nav.service */ "./src/services/nav.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_game_variables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/game.variables */ "./src/game.variables.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LobbyPageComponent = /** @class */ (function () {
    function LobbyPageComponent(_loginService, _navService) {
        this._loginService = _loginService;
        this._navService = _navService;
        this.canStartGame = false;
        this.lobbyPeople = [];
        this.isConnectedToARoom = false;
        this.countDownTimer = null;
        this.isNew = false;
        this.name = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].minLength(3)]);
        this.roomCode = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].minLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].maxLength(4)]);
        this.ticker = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(1000);
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.countdownActive$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.joinedServer = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    // make it so canstart game is responsive to hasenoughplayers and isalive
    LobbyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._navService.isConnectedToARoom$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroy$))
            .subscribe(function (isConnected) {
            _this.isConnectedToARoom = isConnected;
            if (isConnected) {
                _this._navService.currentPlayers
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(_this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (players) { return players.map(function (player) { return player.name; }); }))
                    .subscribe(function (players) {
                    _this.lobbyPeople = players;
                    _this.canStartGame = players.length >= src_game_variables__WEBPACK_IMPORTED_MODULE_7__["gameVariables"].minPlayers;
                });
                _this._navService.startTime
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(_this.destroy$))
                    .subscribe(function (startTime) {
                    if (!!startTime) {
                        //do the countdown
                        _this.ticker
                            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(_this.countdownActive$))
                            .subscribe(function () {
                            var currentTime = new Date().getTime();
                            var secondsRemaining = Math.ceil((startTime - currentTime) / 1000);
                            if (secondsRemaining > 0) {
                                _this.countDownTimer = secondsRemaining;
                            }
                            else {
                                _this.countDownTimer = 0;
                                _this._navService.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_5__["Stage"].RoleReveal);
                            }
                        });
                    }
                    else {
                        // cancel the countdown
                        _this.countdownActive$.next();
                        _this.countDownTimer = null;
                    }
                });
            }
        });
    };
    Object.defineProperty(LobbyPageComponent.prototype, "canCreateOrJoinLobby", {
        get: function () {
            return this.name.invalid || (this.roomCode.invalid && !this.isNew);
        },
        enumerable: true,
        configurable: true
    });
    LobbyPageComponent.prototype.createOrJoinLobby = function () {
        if (this.canCreateOrJoinLobby) {
            this.name.markAsTouched();
            this.roomCode.markAsTouched();
            return;
        }
        var name = this.name.value;
        var roomCode = this.roomCode.value.toUpperCase();
        this.isNew
            ? this.createAndJoinNewLobby(name)
            : this.joinLobby({ name: name, roomCode: roomCode });
    };
    LobbyPageComponent.prototype.createAndJoinNewLobby = function (name) {
        var _this = this;
        this._loginService.createLobby()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
            .subscribe({
            next: function (roomCode) {
                _this.joinLobby({ name: name, roomCode: roomCode });
            },
            error: function (err) { alert(err); }
        });
    };
    LobbyPageComponent.prototype.joinLobby = function (result) {
        var _this = this;
        this._loginService.joinLobby(result).subscribe({
            error: function (err) { alert(err); },
            complete: function () { _this.joinedServer.emit(result); }
        });
    };
    LobbyPageComponent.prototype.startGame = function () {
        this._navService.startGame();
    };
    LobbyPageComponent.prototype.cancelGame = function () {
        this._navService.cancel();
    };
    LobbyPageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
        this.countdownActive$.next();
        this.countdownActive$.complete();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], LobbyPageComponent.prototype, "joinedServer", void 0);
    LobbyPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lobby-page',
            template: __webpack_require__(/*! ./lobby-page.component.html */ "./src/app/lobby-page/lobby-page.component.html"),
            styles: [__webpack_require__(/*! ./lobby-page.component.scss */ "./src/app/lobby-page/lobby-page.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"],
            src_services_nav_service__WEBPACK_IMPORTED_MODULE_3__["NavService"]])
    ], LobbyPageComponent);
    return LobbyPageComponent;
}());



/***/ }),

/***/ "./src/app/mission-page/mission-page.component.html":
/*!**********************************************************!*\
  !*** ./src/app/mission-page/mission-page.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isLoading\">\n  <p>The current team is...</p>\n  <table class=\"player-table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>On Team?</th>\n          <th>Played?</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let player of players; let i = index\">\n          <td>{{player.name}}</td>\n          <td><input disabled type=\"checkbox\" [ngModel]=\"currentTeam[i]\"></td>\n          <td>{{hasPlayedString(i)}}</td>\n        </tr>\n      </tbody>\n  </table>\n  <div *ngIf=\"!revealMode\">\n    <div *ngIf=\"!allCardsPlayed\">\n      <div *ngIf=\"youAreOnTheTeam\">\n        <p>You are on the team</p>\n        <div *ngIf=\"!alreadyPlayedCard\">\n          <p>Pick a card...</p>\n          <div *ngFor=\"let card of playableCards\">\n            <div>\n              <button (click)=\"selectCard(card.enumValue)\">{{card.name}}</button>\n            </div>\n          </div>\n        </div>\n        <div *ngIf=\"alreadyPlayedCard\">\n          <p>You have played your card.</p>\n          <p>Now to wait for the other person...</p>\n        </div>\n      </div>\n\n    <div *ngIf=\"!youAreOnTheTeam\">\n      <p>You are not on the team</p>\n      <p>So you'll have to wait...</p>\n    </div>\n  </div>\n  <div *ngIf=\"allCardsPlayed\">\n    <p>All cards have been played</p>\n    <button (click)=\"revealCards()\">Reveal cards?</button>\n  </div>\n  </div>\n  <div *ngIf=\"revealMode\">\n    <p>Cards: {{revealedCardsAsString}}</p>\n    <p>The mission {{missionPassed ? 'passed' : 'failed'}}</p>\n    <button (click)=\"nextMission()\">Next Mission</button>\n  </div>\n</div>\n<div *ngIf=\"isLoading\">\n  <p>Loading...</p>\n</div>"

/***/ }),

/***/ "./src/app/mission-page/mission-page.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/mission-page/mission-page.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".player-table {\n  text-align: center; }\n  .player-table th, .player-table td {\n    border: 1px solid black; }\n  .player-table label {\n    all: unset; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWlzc2lvbi1wYWdlL0M6XFxVc2Vyc1xcdXNlclxcUHJvamVjdHNcXHJlc2lzdGFuY2UtYXBwL3NyY1xcYXBwXFxtaXNzaW9uLXBhZ2VcXG1pc3Npb24tcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLG1CQUFrQixFQVNyQjtFQVhEO0lBS1Esd0JBQXVCLEVBQzFCO0VBTkw7SUFTUSxXQUFVLEVBQ2IiLCJmaWxlIjoic3JjL2FwcC9taXNzaW9uLXBhZ2UvbWlzc2lvbi1wYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBsYXllci10YWJsZSB7IC8vIFRPRE8gLSBNYWtlIHRoaXMgaXRzIG93biBjb21wb25lbnQgb3Igc29tZXRoaW5nXHJcblxyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICAgIHRoLCB0ZHtcclxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIH1cclxuXHJcbiAgICBsYWJlbCB7XHJcbiAgICAgICAgYWxsOiB1bnNldDtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/mission-page/mission-page.component.ts":
/*!********************************************************!*\
  !*** ./src/app/mission-page/mission-page.component.ts ***!
  \********************************************************/
/*! exports provided: MissionPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissionPageComponent", function() { return MissionPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_mission_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/mission.service */ "./src/services/mission.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/functions */ "./src/functions.ts");
/* harmony import */ var src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/enums/mission-card */ "./src/enums/mission-card.ts");
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MissionPageComponent = /** @class */ (function () {
    function MissionPageComponent(_missionService) {
        this._missionService = _missionService;
        this.revealMode = false;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.forceLoadScreen = false;
    }
    MissionPageComponent.prototype.ngOnInit = function () {
        this._missionService.getTeamPick()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_4__["bind"])(this, 'currentTeam'));
        this._missionService.getPlayableCards
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_4__["bind"])(this, 'playableCards'));
        this._missionService.getPlayedCards
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_4__["bind"])(this, 'playedCards'));
        this._missionService.getTeamSize()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_4__["bind"])(this, 'missionSize'));
    };
    MissionPageComponent.prototype.selectCard = function (missionCard) {
        // TODO refactor card filtering logic
        if (!this.areYouASpy && missionCard === src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["MissionCard"].fail) {
            alert('you cannot play that card');
            return;
        }
        this.playedCards[this.playerIndex] = missionCard;
        this._missionService.updatePlayedCards(this.playedCards);
    };
    MissionPageComponent.prototype.revealCards = function () {
        this.revealMode = true;
    };
    MissionPageComponent.prototype.nextMission = function () {
        this.forceLoadScreen = true;
        this._missionService.nextMission(this.missionPassed);
    };
    MissionPageComponent.prototype.hasPlayedString = function (index) {
        return this.currentTeam[index]
            ? this.playedCards[index] === src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["MissionCard"].none
                ? '...'
                : 'played'
            : '';
    };
    Object.defineProperty(MissionPageComponent.prototype, "revealedCardsAsString", {
        get: function () {
            return this.cardstoReveal.map(function (card) { return src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["missionCards"][card].name; }).join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "cardstoReveal", {
        get: function () {
            return this.playedCards.filter(function (card) { return card !== src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["MissionCard"].none; }).sort();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "missionPassed", {
        get: function () {
            var requiredFails = this.missionSize.twoFail ? 2 : 1;
            return this.cardstoReveal.filter(function (card) { return card === src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["MissionCard"].fail; }).length < requiredFails;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "allCardsPlayed", {
        get: function () {
            return this.playedCards.filter(function (card) { return card !== src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["MissionCard"].none; }).length === this.missionSize.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "playerIndex", {
        get: function () {
            return this.players.map(function (player) { return player.name; }).indexOf(this.playerName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "alreadyPlayedCard", {
        get: function () {
            return this.playedCards[this.playerIndex] != src_enums_mission_card__WEBPACK_IMPORTED_MODULE_5__["MissionCard"].none;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "areYouASpy", {
        get: function () {
            var _this = this;
            var you = this.players.filter(function (player) { return player.name === _this.playerName; });
            if (you.length === 0) {
                return false;
            }
            if (you[0].team === src_enums_team_enum__WEBPACK_IMPORTED_MODULE_6__["Team"].spy) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "isLoading", {
        get: function () {
            return [
                this.currentTeam,
                this.playableCards,
                this.playedCards,
                this.missionSize
            ].some(function (prop) { return prop === undefined; }) || this.forceLoadScreen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionPageComponent.prototype, "youAreOnTheTeam", {
        get: function () {
            return this.currentTeam[this.playerIndex] === true;
        },
        enumerable: true,
        configurable: true
    });
    MissionPageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], MissionPageComponent.prototype, "playerName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], MissionPageComponent.prototype, "players", void 0);
    MissionPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mission-page',
            template: __webpack_require__(/*! ./mission-page.component.html */ "./src/app/mission-page/mission-page.component.html"),
            styles: [__webpack_require__(/*! ./mission-page.component.scss */ "./src/app/mission-page/mission-page.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_mission_service__WEBPACK_IMPORTED_MODULE_1__["MissionService"]])
    ], MissionPageComponent);
    return MissionPageComponent;
}());



/***/ }),

/***/ "./src/app/role-reveal-page/role-reveal-page.component.html":
/*!******************************************************************!*\
  !*** ./src/app/role-reveal-page/role-reveal-page.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button *ngIf=\"canAssignRoles\" (click)=\"assignRoles()\">Assign Roles</button>\n\n<div *ngIf=\"!canAssignRoles && !rolesAssigned\">Loading...</div>\n<div *ngIf=\"player\">\n  <p>You are a {{teamPipe(player.team)}} {{rolePipe(player.role)}}</p>\n  <div class=\"fellow spies\" *ngIf=\"player.team == teamEnum.spy\">\n    Your fellow spies are:\n    <ul *ngFor=\"let player of fellowSpies\">\n      <li>{{player.name}}</li>\n    </ul>\n  </div>\n</div>\n\n<div *ngIf=\"rolesAssigned\">\n  <button (click)=\"startGame()\">Start the game</button>\n</div>"

/***/ }),

/***/ "./src/app/role-reveal-page/role-reveal-page.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/role-reveal-page/role-reveal-page.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvbGUtcmV2ZWFsLXBhZ2Uvcm9sZS1yZXZlYWwtcGFnZS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/role-reveal-page/role-reveal-page.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/role-reveal-page/role-reveal-page.component.ts ***!
  \****************************************************************/
/*! exports provided: RoleRevealPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleRevealPageComponent", function() { return RoleRevealPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_role_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/role.service */ "./src/services/role.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_enums_role_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/enums/role.enum */ "./src/enums/role.enum.ts");
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
/* harmony import */ var src_services_nav_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/services/nav.service */ "./src/services/nav.service.ts");
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var src_services_mission_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/services/mission.service */ "./src/services/mission.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RoleRevealPageComponent = /** @class */ (function () {
    function RoleRevealPageComponent(_roleService, _navService, _missionService) {
        this._roleService = _roleService;
        this._navService = _navService;
        this._missionService = _missionService;
        this.playersAssigned = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.teamEnum = src_enums_team_enum__WEBPACK_IMPORTED_MODULE_5__["Team"];
        this.canAssignRoles = false;
        this.rolesAssigned = false;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.teamPipe = src_enums_team_enum__WEBPACK_IMPORTED_MODULE_5__["teamPipe"];
        this.rolePipe = src_enums_role_enum__WEBPACK_IMPORTED_MODULE_4__["rolePipe"];
    }
    RoleRevealPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._roleService.currentPlayers()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$))
            .subscribe(function (players) {
            if (players.every(function (player) { return _this.playerIsAssigned(player); })) {
                _this.currentPlayers = players;
                _this.rolesAssigned = true;
                _this.canAssignRoles = false;
                _this.player = players.filter(function (player) { return player.name === _this.playerName; })[0];
                _this.playersAssigned.emit(players);
            }
            else {
                _this.currentPlayers = [];
                _this.rolesAssigned = false;
                _this.canAssignRoles = true;
            }
        });
    };
    RoleRevealPageComponent.prototype.assignRoles = function () {
        if (!this.canAssignRoles) {
            return;
        }
        this._roleService.assignRoles();
    };
    RoleRevealPageComponent.prototype.startGame = function () {
        if (!this.playerIsAssigned(this.player)) {
            return;
        }
        this._missionService.newMission(0, 0);
        this._navService.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_7__["Stage"].TeamPick);
    };
    RoleRevealPageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    Object.defineProperty(RoleRevealPageComponent.prototype, "fellowSpies", {
        get: function () {
            var _this = this;
            if (this.player.team !== src_enums_team_enum__WEBPACK_IMPORTED_MODULE_5__["Team"].spy) {
                return [];
            }
            return this.currentPlayers
                .filter(function (player) { return player.team === src_enums_team_enum__WEBPACK_IMPORTED_MODULE_5__["Team"].spy && player.name !== _this.player.name; });
        },
        enumerable: true,
        configurable: true
    });
    RoleRevealPageComponent.prototype.playerIsAssigned = function (player) {
        return player.role != src_enums_role_enum__WEBPACK_IMPORTED_MODULE_4__["Role"].unassigned && player.team != src_enums_team_enum__WEBPACK_IMPORTED_MODULE_5__["Team"].unassigned;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], RoleRevealPageComponent.prototype, "playerName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoleRevealPageComponent.prototype, "playersAssigned", void 0);
    RoleRevealPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-role-reveal-page',
            template: __webpack_require__(/*! ./role-reveal-page.component.html */ "./src/app/role-reveal-page/role-reveal-page.component.html"),
            styles: [__webpack_require__(/*! ./role-reveal-page.component.scss */ "./src/app/role-reveal-page/role-reveal-page.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_role_service__WEBPACK_IMPORTED_MODULE_1__["RoleService"],
            src_services_nav_service__WEBPACK_IMPORTED_MODULE_6__["NavService"],
            src_services_mission_service__WEBPACK_IMPORTED_MODULE_8__["MissionService"]])
    ], RoleRevealPageComponent);
    return RoleRevealPageComponent;
}());



/***/ }),

/***/ "./src/app/session-info-bar/session-info-bar.component.html":
/*!******************************************************************!*\
  !*** ./src/app/session-info-bar/session-info-bar.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"nav-spacer\"></div>\n<div class=\"navbar fixed-top navbar-dark bg-dark\">\n  <ng-container *ngIf=\"!session && !player\" style=\"width:100%\">\n    <span></span>\n    <span>Tom's great resistance app</span>\n    <span></span>\n  </ng-container>\n  <ng-container *ngIf=\"!!session\">\n    <span>Name: {{session.name}}</span>\n    <span>/</span>\n    <span>Room Code: {{session.roomCode}}</span>\n  </ng-container>\n  <ng-container *ngIf=\"!!player\">\n      <span>/</span>\n      <fa-icon [icon]=\"faUser\" (click)=clickUser()></fa-icon>\n  </ng-container>\n</div>"

/***/ }),

/***/ "./src/app/session-info-bar/session-info-bar.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/session-info-bar/session-info-bar.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-spacer {\n  padding-top: 40px; }\n\n.navbar {\n  color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2Vzc2lvbi1pbmZvLWJhci9DOlxcVXNlcnNcXHVzZXJcXFByb2plY3RzXFxyZXNpc3RhbmNlLWFwcC9zcmNcXGFwcFxcc2Vzc2lvbi1pbmZvLWJhclxcc2Vzc2lvbi1pbmZvLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFpQixFQUNwQjs7QUFFRDtFQUNJLGFBQVksRUFDZiIsImZpbGUiOiJzcmMvYXBwL3Nlc3Npb24taW5mby1iYXIvc2Vzc2lvbi1pbmZvLWJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXYtc3BhY2VyIHtcclxuICAgIHBhZGRpbmctdG9wOiA0MHB4O1xyXG59XHJcblxyXG4ubmF2YmFyIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/session-info-bar/session-info-bar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/session-info-bar/session-info-bar.component.ts ***!
  \****************************************************************/
/*! exports provided: SessionInfoBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionInfoBarComponent", function() { return SessionInfoBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
/* harmony import */ var src_enums_role_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/enums/role.enum */ "./src/enums/role.enum.ts");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var src_services_base_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/services/base.service */ "./src/services/base.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SessionInfoBarComponent = /** @class */ (function () {
    function SessionInfoBarComponent(_base) {
        this._base = _base;
        this.faUser = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faUser"];
    }
    SessionInfoBarComponent.prototype.ngOnInit = function () {
    };
    SessionInfoBarComponent.prototype.clickUser = function () {
        if (this.players === undefined) {
            return;
        }
        if (this.player.team === src_enums_team_enum__WEBPACK_IMPORTED_MODULE_1__["Team"].spy) { // TODO improve the click info
            alert("You are a " + Object(src_enums_team_enum__WEBPACK_IMPORTED_MODULE_1__["teamPipe"])(this.player.team) + ": " + Object(src_enums_role_enum__WEBPACK_IMPORTED_MODULE_2__["rolePipe"])(this.player.role) + ", and your fellow spies are " + this.fellowSpies);
        }
        else {
            alert("You are a " + Object(src_enums_team_enum__WEBPACK_IMPORTED_MODULE_1__["teamPipe"])(this.player.team) + ": " + Object(src_enums_role_enum__WEBPACK_IMPORTED_MODULE_2__["rolePipe"])(this.player.role));
        }
    };
    Object.defineProperty(SessionInfoBarComponent.prototype, "fellowSpies", {
        get: function () {
            var _this = this;
            if (this.player.team !== src_enums_team_enum__WEBPACK_IMPORTED_MODULE_1__["Team"].spy) {
                return 'none of your business';
            }
            return this.players
                .filter(function (player) { return player.team === src_enums_team_enum__WEBPACK_IMPORTED_MODULE_1__["Team"].spy && player.name !== _this.player.name; })
                .map(function (player) { return player.name; })
                .join(', ');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SessionInfoBarComponent.prototype, "session", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SessionInfoBarComponent.prototype, "player", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], SessionInfoBarComponent.prototype, "players", void 0);
    SessionInfoBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-session-info-bar',
            template: __webpack_require__(/*! ./session-info-bar.component.html */ "./src/app/session-info-bar/session-info-bar.component.html"),
            styles: [__webpack_require__(/*! ./session-info-bar.component.scss */ "./src/app/session-info-bar/session-info-bar.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_base_service__WEBPACK_IMPORTED_MODULE_4__["BaseService"]])
    ], SessionInfoBarComponent);
    return SessionInfoBarComponent;
}());



/***/ }),

/***/ "./src/app/team-pick-page/team-pick-page.component.html":
/*!**************************************************************!*\
  !*** ./src/app/team-pick-page/team-pick-page.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"isLoading\">\n  <p>Loading...</p>\n</ng-container>\n\n<ng-container *ngIf=\"!isLoading\">\n  <p class=\"whos-turn\" *ngIf=\"!!currentLeader\">It is <i>{{whoseTurn}}</i> turn to pick a team</p>\n\n  <div *ngIf=\"youAreTheLeader\">\n    <h6> You are the leader.</h6>\n    <h6>Pick a team.</h6>\n    <p>{{numberOfSelectedPlayers}}/{{teamSize}} players selected</p>\n    <table class=\"player-table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>On Team?</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let player of players; let i = index\">\n          <td><label for=\"select-{{i}}\">{{player.name}}</label></td>\n          <td><input id=\"select-{{i}}\" type=\"checkbox\" [(ngModel)]=\"selectedPlayers[i]\" (ngModelChange)=\"teamChange();\"></td>\n        </tr>\n      </tbody>\n    </table>\n    \n    <button [disabled]=\"!canSubmitTeam\" (click)=\"submitTeam()\">Thats my team</button>\n  </div>\n\n  <div *ngIf=\"!youAreTheLeader\">\n      <p>{{numberOfSelectedPlayers}}/{{teamSize}} players selected</p>\n      <table class=\"player-table\">\n          <thead>\n            <tr>\n              <th>Name</th>\n              <th>On Team?</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let player of players; let i = index\">\n              <td>{{player.name}}</td>\n              <td><input disabled type=\"checkbox\" [ngModel]=\"selectedPlayers[i]\"></td>\n            </tr>\n          </tbody>\n        </table>\n  </div>\n</ng-container>"

/***/ }),

/***/ "./src/app/team-pick-page/team-pick-page.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/team-pick-page/team-pick-page.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".player-table {\n  text-align: center; }\n  .player-table th, .player-table td {\n    border: 1px solid black; }\n  .player-table label {\n    all: unset; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVhbS1waWNrLXBhZ2UvQzpcXFVzZXJzXFx1c2VyXFxQcm9qZWN0c1xccmVzaXN0YW5jZS1hcHAvc3JjXFxhcHBcXHRlYW0tcGljay1wYWdlXFx0ZWFtLXBpY2stcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLG1CQUFrQixFQVNyQjtFQVhEO0lBS1Esd0JBQXVCLEVBQzFCO0VBTkw7SUFTUSxXQUFVLEVBQ2IiLCJmaWxlIjoic3JjL2FwcC90ZWFtLXBpY2stcGFnZS90ZWFtLXBpY2stcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wbGF5ZXItdGFibGUgeyAvLyBUT0RPIC0gTWFrZSB0aGlzIGl0cyBvd24gY29tcG9uZW50IG9yIHNvbWV0aGluZ1xyXG5cclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICB0aCwgdGR7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgbGFiZWwge1xyXG4gICAgICAgIGFsbDogdW5zZXQ7XHJcbiAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/team-pick-page/team-pick-page.component.ts":
/*!************************************************************!*\
  !*** ./src/app/team-pick-page/team-pick-page.component.ts ***!
  \************************************************************/
/*! exports provided: TeamPickPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamPickPageComponent", function() { return TeamPickPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_mission_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/mission.service */ "./src/services/mission.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_services_nav_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/services/nav.service */ "./src/services/nav.service.ts");
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var src_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/functions */ "./src/functions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TeamPickPageComponent = /** @class */ (function () {
    function TeamPickPageComponent(_missionService, _navService) {
        this._missionService = _missionService;
        this._navService = _navService;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    TeamPickPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._missionService.currentLeader()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (leader) { return _this.players[leader].name; }))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_6__["bind"])(this, 'currentLeader'));
        this._missionService.getTeamSize()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (teamSize) { return teamSize.size; }))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_6__["bind"])(this, 'teamSize'));
        this._missionService.getTeamPick()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_6__["bind"])(this, 'selectedPlayers'));
    };
    TeamPickPageComponent.prototype.teamChange = function () {
        this._missionService.updateTeamPick(this.selectedPlayers);
    };
    TeamPickPageComponent.prototype.submitTeam = function () {
        if (!this.canSubmitTeam) {
            return;
        }
        this._navService.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_5__["Stage"].Vote);
    };
    Object.defineProperty(TeamPickPageComponent.prototype, "isLoading", {
        get: function () {
            return [
                this.currentLeader,
                this.selectedPlayers,
                this.teamSize
            ].some(function (prop) { return prop === undefined; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamPickPageComponent.prototype, "canSubmitTeam", {
        get: function () {
            return this.numberOfSelectedPlayers === this.teamSize && this.youAreTheLeader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamPickPageComponent.prototype, "numberOfSelectedPlayers", {
        get: function () {
            return this.selectedPlayers.filter(function (selected) { return selected; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamPickPageComponent.prototype, "youAreTheLeader", {
        get: function () {
            return this.playerName === this.currentLeader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeamPickPageComponent.prototype, "whoseTurn", {
        get: function () {
            if (this.youAreTheLeader) {
                return 'YOUR';
            }
            else {
                return this.currentLeader + "'s";
            }
        },
        enumerable: true,
        configurable: true
    });
    TeamPickPageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], TeamPickPageComponent.prototype, "players", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], TeamPickPageComponent.prototype, "playerName", void 0);
    TeamPickPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-pick-page',
            template: __webpack_require__(/*! ./team-pick-page.component.html */ "./src/app/team-pick-page/team-pick-page.component.html"),
            styles: [__webpack_require__(/*! ./team-pick-page.component.scss */ "./src/app/team-pick-page/team-pick-page.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_mission_service__WEBPACK_IMPORTED_MODULE_1__["MissionService"],
            src_services_nav_service__WEBPACK_IMPORTED_MODULE_4__["NavService"]])
    ], TeamPickPageComponent);
    return TeamPickPageComponent;
}());



/***/ }),

/***/ "./src/app/vote-page/vote-page.component.html":
/*!****************************************************!*\
  !*** ./src/app/vote-page/vote-page.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isLoading\">\n  <p>The team is ...</p>\n  <table class=\"player-table\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>On Team?</th>\n          <th>Vote</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let player of players; let i = index\">\n          <td>{{player.name}}</td>\n          <td><input disabled type=\"checkbox\" [ngModel]=\"teamPick[i]\"></td>\n          <td>{{tableVote(i)}}</td>\n        </tr>\n      </tbody>\n    </table>\n\n  <div *ngIf=\"!wait\">\n    <p>{{noOfVotesIn}} / {{players.length}} votes are in</p>\n    <p *ngIf=\"yourVote !== null\">You have voted this team {{yourVote ? 'up' : 'down'}}</p>\n    <button *ngIf=\"!allVotesIn\"  (click)=\"submitVote(true)\">Yes</button>\n    <button *ngIf=\"!allVotesIn\"  (click)=\"submitVote(false)\">No</button>\n    <div>\n      <button *ngIf=\"allVotesIn\" (click)=\"seeVotes()\">See votes</button>\n    </div>\n  </div>\n\n  <div *ngIf=\"wait\">\n    <p>The team has {{hasItGoneAhead ? 'gone ahead' : 'not gone ahead'}}!</p>\n    <button (click)=\"moveOn()\">Move on</button>\n  </div>\n</div>\n\n<div *ngIf=\"isLoading\">\n  <p>Loading...</p>\n</div>"

/***/ }),

/***/ "./src/app/vote-page/vote-page.component.scss":
/*!****************************************************!*\
  !*** ./src/app/vote-page/vote-page.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".player-table {\n  text-align: center; }\n  .player-table th, .player-table td {\n    border: 1px solid black; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdm90ZS1wYWdlL0M6XFxVc2Vyc1xcdXNlclxcUHJvamVjdHNcXHJlc2lzdGFuY2UtYXBwL3NyY1xcYXBwXFx2b3RlLXBhZ2VcXHZvdGUtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLG1CQUFrQixFQUtyQjtFQVBEO0lBS1Esd0JBQXVCLEVBQzFCIiwiZmlsZSI6InNyYy9hcHAvdm90ZS1wYWdlL3ZvdGUtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wbGF5ZXItdGFibGUgeyAvLyBUT0RPIC0gTWFrZSB0aGlzIGl0cyBvd24gY29tcG9uZW50IG9yIHNvbWV0aGluZ1xyXG5cclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHJcbiAgICB0aCwgdGR7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/vote-page/vote-page.component.ts":
/*!**************************************************!*\
  !*** ./src/app/vote-page/vote-page.component.ts ***!
  \**************************************************/
/*! exports provided: VotePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VotePageComponent", function() { return VotePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_mission_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/mission.service */ "./src/services/mission.service.ts");
/* harmony import */ var src_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/functions */ "./src/functions.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/enums/vote.enum */ "./src/enums/vote.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VotePageComponent = /** @class */ (function () {
    function VotePageComponent(_missionService) {
        this._missionService = _missionService;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    VotePageComponent.prototype.ngOnInit = function () {
        // TODO Remove this eventually
        console.log(this.players);
        this._missionService.currentVotes()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroy$))
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_2__["bind"])(this, 'currentVotes'));
        this._missionService.getTeamPick()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_2__["bind"])(this, 'teamPick'));
        this._missionService.wait.subscribe(Object(src_functions__WEBPACK_IMPORTED_MODULE_2__["bind"])(this, 'wait'));
    };
    VotePageComponent.prototype.submitVote = function (vote) {
        if (this.playerIndex === -1) {
            console.error('You are not a player in this game');
            return;
        }
        this._missionService.submitVote(vote, this.playerIndex);
    };
    VotePageComponent.prototype.seeVotes = function () {
        if (!this.allVotesIn) {
            console.error('Not all votes are in yet');
            return;
        }
        this._missionService.updateWait(true);
    };
    VotePageComponent.prototype.moveOn = function () {
        if (!this.allVotesIn) {
            console.error('The votes aren\'t all in');
            return;
        }
        this._missionService.updateWait(false);
        this._missionService.moveOn(this.hasItGoneAhead);
    };
    VotePageComponent.prototype.votePipe = function (vote) {
        switch (vote) {
            case src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].notVoted:
                return 'not voted!';
            case src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].upvoted:
                return 'voted it up!';
            case src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].downvoted:
                return 'voted it down!';
            default:
                return 'error';
        }
    };
    VotePageComponent.prototype.tableVote = function (index) {
        if (!this.wait && this.currentVotes[index] !== src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].notVoted) {
            return '?';
        }
        else if (this.currentVotes[index] === src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].notVoted) {
            return '';
        }
        else {
            return this.votePipe(this.currentVotes[index]);
        }
    };
    Object.defineProperty(VotePageComponent.prototype, "hasItGoneAhead", {
        get: function () {
            var upvotes = this.currentVotes.filter(function (vote) { return vote === src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].upvoted; }).length;
            var downvotes = this.players.length - upvotes;
            return upvotes > downvotes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VotePageComponent.prototype, "playerIndex", {
        get: function () {
            return this.players.map(function (player) { return player.name; }).indexOf(this.playerName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VotePageComponent.prototype, "noOfVotesIn", {
        get: function () {
            return this.currentVotes.filter(function (vote) { return vote !== src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].notVoted; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VotePageComponent.prototype, "allVotesIn", {
        get: function () {
            return this.noOfVotesIn === this.players.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VotePageComponent.prototype, "isLoading", {
        get: function () {
            return [this.currentVotes, this.teamPick, this.wait].some(function (prop) { return prop === undefined; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VotePageComponent.prototype, "yourVote", {
        get: function () {
            switch (this.currentVotes[this.playerIndex]) {
                case src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].notVoted:
                    return null;
                case src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].upvoted:
                    return true;
                case src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_5__["Vote"].downvoted:
                    return false;
                default:
                    console.error('An error with the votes has occurred');
                    return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    VotePageComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], VotePageComponent.prototype, "playerName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], VotePageComponent.prototype, "players", void 0);
    VotePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vote-page',
            template: __webpack_require__(/*! ./vote-page.component.html */ "./src/app/vote-page/vote-page.component.html"),
            styles: [__webpack_require__(/*! ./vote-page.component.scss */ "./src/app/vote-page/vote-page.component.scss")]
        }),
        __metadata("design:paramtypes", [src_services_mission_service__WEBPACK_IMPORTED_MODULE_1__["MissionService"]])
    ], VotePageComponent);
    return VotePageComponent;
}());



/***/ }),

/***/ "./src/enums/game-outcome.enum.ts":
/*!****************************************!*\
  !*** ./src/enums/game-outcome.enum.ts ***!
  \****************************************/
/*! exports provided: GameOutcome, GameOutcomeWinnerPipe, GameOutcomeMessagePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameOutcome", function() { return GameOutcome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameOutcomeWinnerPipe", function() { return GameOutcomeWinnerPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameOutcomeMessagePipe", function() { return GameOutcomeMessagePipe; });
/* harmony import */ var _team_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./team.enum */ "./src/enums/team.enum.ts");

var GameOutcome;
(function (GameOutcome) {
    GameOutcome[GameOutcome["sufficientSuccesses"] = 0] = "sufficientSuccesses";
    GameOutcome[GameOutcome["sufficientFailures"] = 1] = "sufficientFailures";
    GameOutcome[GameOutcome["tooManyDownvotes"] = 2] = "tooManyDownvotes";
})(GameOutcome || (GameOutcome = {}));
function GameOutcomeWinnerPipe(gameOutcome) {
    var resistanceWins = [GameOutcome.sufficientSuccesses];
    var spyWins = [GameOutcome.sufficientFailures, GameOutcome.tooManyDownvotes];
    if (resistanceWins.some(function (outcome) { return outcome === gameOutcome; })) {
        return _team_enum__WEBPACK_IMPORTED_MODULE_0__["Team"].resistance;
    }
    else if (spyWins.some(function (outcome) { return outcome === gameOutcome; })) {
        return _team_enum__WEBPACK_IMPORTED_MODULE_0__["Team"].spy;
    }
    else {
        console.error('An error has occurred');
        return _team_enum__WEBPACK_IMPORTED_MODULE_0__["Team"].unassigned;
    }
}
function GameOutcomeMessagePipe(gameOutcome) {
    switch (gameOutcome) {
        case GameOutcome.sufficientSuccesses:
            return 'The missions have succeeded';
        case GameOutcome.sufficientFailures:
            return 'The missions have failed';
        case GameOutcome.tooManyDownvotes:
            return 'Too many teams were downvoted';
        default:
            console.error('An error has occurred');
            return 'An error has occurred';
    }
}


/***/ }),

/***/ "./src/enums/game-type.ts":
/*!********************************!*\
  !*** ./src/enums/game-type.ts ***!
  \********************************/
/*! exports provided: GameType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameType", function() { return GameType; });
var GameType;
(function (GameType) {
    GameType[GameType["regular"] = 0] = "regular";
})(GameType || (GameType = {}));


/***/ }),

/***/ "./src/enums/mission-card.ts":
/*!***********************************!*\
  !*** ./src/enums/mission-card.ts ***!
  \***********************************/
/*! exports provided: MissionCard, missionCards, cardsInPlay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissionCard", function() { return MissionCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "missionCards", function() { return missionCards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cardsInPlay", function() { return cardsInPlay; });
/* harmony import */ var _game_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-type */ "./src/enums/game-type.ts");

var MissionCard;
(function (MissionCard) {
    MissionCard[MissionCard["none"] = 0] = "none";
    MissionCard[MissionCard["pass"] = 1] = "pass";
    MissionCard[MissionCard["fail"] = 2] = "fail";
})(MissionCard || (MissionCard = {}));
var missionCards = [
    { enumValue: MissionCard.none, name: 'N/A' },
    { enumValue: MissionCard.pass, name: 'Pass' },
    { enumValue: MissionCard.fail, name: 'Fail' }
];
function cardsInPlay(gameType) {
    switch (gameType) {
        case _game_type__WEBPACK_IMPORTED_MODULE_0__["GameType"].regular:
            return [MissionCard.pass, MissionCard.fail];
        default:
            console.error('Game must have a game type');
            return [];
    }
}


/***/ }),

/***/ "./src/enums/mission-outcome.ts":
/*!**************************************!*\
  !*** ./src/enums/mission-outcome.ts ***!
  \**************************************/
/*! exports provided: MissionOutcome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissionOutcome", function() { return MissionOutcome; });
var MissionOutcome;
(function (MissionOutcome) {
    MissionOutcome[MissionOutcome["notStarted"] = 0] = "notStarted";
    MissionOutcome[MissionOutcome["pass"] = 1] = "pass";
    MissionOutcome[MissionOutcome["fail"] = 2] = "fail";
})(MissionOutcome || (MissionOutcome = {}));


/***/ }),

/***/ "./src/enums/role.enum.ts":
/*!********************************!*\
  !*** ./src/enums/role.enum.ts ***!
  \********************************/
/*! exports provided: Role, rolePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rolePipe", function() { return rolePipe; });
var Role;
(function (Role) {
    Role[Role["unassigned"] = 0] = "unassigned";
    Role[Role["regular"] = 1] = "regular";
})(Role || (Role = {}));
function rolePipe(role) {
    switch (role) {
        case Role.unassigned:
            return '(unassigned)';
        case Role.regular:
            return '(regular)';
        default:
            return '(ERROR)';
    }
}


/***/ }),

/***/ "./src/enums/stage.enum.ts":
/*!*********************************!*\
  !*** ./src/enums/stage.enum.ts ***!
  \*********************************/
/*! exports provided: Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
var Stage;
(function (Stage) {
    Stage[Stage["NotBegun"] = 0] = "NotBegun";
    Stage[Stage["RoleReveal"] = 1] = "RoleReveal";
    Stage[Stage["TeamPick"] = 2] = "TeamPick";
    Stage[Stage["Vote"] = 3] = "Vote";
    Stage[Stage["Mission"] = 4] = "Mission";
    Stage[Stage["Reveal"] = 5] = "Reveal";
    Stage[Stage["GameOver"] = 6] = "GameOver";
})(Stage || (Stage = {}));


/***/ }),

/***/ "./src/enums/team.enum.ts":
/*!********************************!*\
  !*** ./src/enums/team.enum.ts ***!
  \********************************/
/*! exports provided: Team, teamPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Team", function() { return Team; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "teamPipe", function() { return teamPipe; });
var Team;
(function (Team) {
    Team[Team["unassigned"] = 0] = "unassigned";
    Team[Team["resistance"] = 1] = "resistance";
    Team[Team["spy"] = 2] = "spy";
})(Team || (Team = {}));
function teamPipe(team) {
    switch (team) {
        case Team.unassigned:
            return '(unassigned)';
        case Team.resistance:
            return 'Resistance';
        case Team.spy:
            return 'Spy';
        default:
            return '(ERROR)';
    }
}


/***/ }),

/***/ "./src/enums/vote.enum.ts":
/*!********************************!*\
  !*** ./src/enums/vote.enum.ts ***!
  \********************************/
/*! exports provided: Vote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vote", function() { return Vote; });
var Vote;
(function (Vote) {
    Vote[Vote["notVoted"] = 0] = "notVoted";
    Vote[Vote["upvoted"] = 1] = "upvoted";
    Vote[Vote["downvoted"] = 2] = "downvoted";
})(Vote || (Vote = {}));


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBNcTXRrtyqhWzz6WxD8DKyAxpwpTWn458",
        authDomain: "resistance-app-e9f05.firebaseapp.com",
        databaseURL: "https://resistance-app-e9f05.firebaseio.com",
        projectId: "resistance-app-e9f05",
        storageBucket: "resistance-app-e9f05.appspot.com",
        messagingSenderId: "767828804753"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/functions.ts":
/*!**************************!*\
  !*** ./src/functions.ts ***!
  \**************************/
/*! exports provided: bind, log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

/**
 * Creates a callback function for a subscription.
 * The given object's property will be updated with the value from the subscription.
 * @param obj  The object on which the property exists.
 * @param prop  The property to be updated.
 * @returns       A callback function to update the object's property with the callback's input.
 */
function bind(obj, prop) {
    return function (value) { obj[prop] = value; };
}
function log() {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (value) {
        console.log(value);
        return value;
    });
}


/***/ }),

/***/ "./src/game.variables.ts":
/*!*******************************!*\
  !*** ./src/game.variables.ts ***!
  \*******************************/
/*! exports provided: gameVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gameVariables", function() { return gameVariables; });
var gameVariables = {
    minPlayers: 5,
    maxPlayers: 10,
    noOfMissionsPerGame: 5,
    noOfMissionsToWin: 3,
    maxNoOfVotesPerMission: 5,
    missionSizes: [
        [{ size: 2 }, { size: 3 }, { size: 2 }, { size: 3 }, { size: 3 }],
        [{ size: 2 }, { size: 3 }, { size: 4 }, { size: 3 }, { size: 4 }],
        [{ size: 2 }, { size: 3 }, { size: 3 }, { size: 4, twoFail: true }, { size: 4 }],
        [{ size: 3 }, { size: 4 }, { size: 4 }, { size: 5, twoFail: true }, { size: 5 }],
        [{ size: 3 }, { size: 4 }, { size: 4 }, { size: 5, twoFail: true }, { size: 5 }],
        [{ size: 3 }, { size: 4 }, { size: 4 }, { size: 5, twoFail: true }, { size: 5 }]
    ]
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./src/models/game.ts":
/*!****************************!*\
  !*** ./src/models/game.ts ***!
  \****************************/
/*! exports provided: newGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newGame", function() { return newGame; });
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var src_enums_game_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/enums/game-type */ "./src/enums/game-type.ts");
/* harmony import */ var src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/enums/mission-outcome */ "./src/enums/mission-outcome.ts");
/* harmony import */ var src_game_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/game.variables */ "./src/game.variables.ts");




function newGame() {
    var newGame = {
        stage: src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_0__["Stage"].NotBegun,
        startTime: null,
        team: [],
        votes: [],
        missionOutcomes: Array(src_game_variables__WEBPACK_IMPORTED_MODULE_3__["gameVariables"].noOfMissionsPerGame).fill(src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_2__["MissionOutcome"].notStarted),
        currentMission: 0,
        noOfDownvotedTeams: 0,
        leader: null,
        gameType: src_enums_game_type__WEBPACK_IMPORTED_MODULE_1__["GameType"].regular,
        playedCards: [],
        wait: false
    };
    return newGame;
}


/***/ }),

/***/ "./src/models/mission.ts":
/*!*******************************!*\
  !*** ./src/models/mission.ts ***!
  \*******************************/
/*! exports provided: newMission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newMission", function() { return newMission; });
function newMission() {
    var newMission = {
        downvotedTeams: [],
        downvotedVotes: [],
        leader: null
    };
    return newMission;
}


/***/ }),

/***/ "./src/models/player.ts":
/*!******************************!*\
  !*** ./src/models/player.ts ***!
  \******************************/
/*! exports provided: newPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newPlayer", function() { return newPlayer; });
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
/* harmony import */ var src_enums_role_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/enums/role.enum */ "./src/enums/role.enum.ts");


function newPlayer(name) {
    var newPlayer = {
        name: name,
        team: src_enums_team_enum__WEBPACK_IMPORTED_MODULE_0__["Team"].unassigned,
        role: src_enums_role_enum__WEBPACK_IMPORTED_MODULE_1__["Role"].unassigned
    };
    return newPlayer;
}


/***/ }),

/***/ "./src/services/base.service.ts":
/*!**************************************!*\
  !*** ./src/services/base.service.ts ***!
  \**************************************/
/*! exports provided: CollectionEnum, hello, BaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionEnum", function() { return CollectionEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hello", function() { return hello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CollectionEnum;
(function (CollectionEnum) {
    CollectionEnum[CollectionEnum["player"] = 0] = "player";
    CollectionEnum[CollectionEnum["mission"] = 1] = "mission";
})(CollectionEnum || (CollectionEnum = {}));
function hello() { return 'hello'; }
var BaseService = /** @class */ (function () {
    function BaseService(db) {
        this.db = db;
        this.gameString = 'game';
        this.playerString = 'player';
        this.missionString = 'mission';
    }
    // Meta
    BaseService.prototype.game = function (roomCode) {
        return !!roomCode
            ? this.db.doc(this.gameString + "/" + roomCode)
            : this.storedGame;
    };
    BaseService.prototype.doesDocExist = function (collection, ref, roomCode) {
        var doc = collection === ''
            ? this.game(roomCode)
            : this.game(roomCode).collection(collection).doc(ref);
        return doc.get()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (metaData) { return metaData.exists; }));
    };
    BaseService.prototype.connectToRoom = function (roomCode) {
        this.storedGame = this.db.collection(this.gameString).doc(roomCode);
    };
    BaseService.prototype.idGenerator = function () {
        return this.db.createId().slice(0, 4).toUpperCase();
    };
    // Game
    BaseService.prototype.getGame = function (roomCode) {
        return this.game(roomCode).valueChanges();
    };
    BaseService.prototype.getGameProperty = function (property, roomCode) {
        return this.game(roomCode).valueChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (o) { return !!o ? o[property] : null; }));
    };
    BaseService.prototype.updateGameProperty = function (property, value, roomCode) {
        var data = {};
        data[property] = value;
        this.game(roomCode).update(data);
    };
    BaseService.prototype.addGame = function (roomCode, game) {
        this.game(roomCode).set(game);
    };
    // General
    BaseService.prototype.collectionBuilder = function (collection, ref, subcollection) {
        return collection + "/" + ref + "/" + subcollection;
    };
    BaseService.prototype.getCollection = function (collection, roomCode) {
        return this.game(roomCode).collection(collection)
            .valueChanges();
    };
    BaseService.prototype.getCollectionCount = function (collection, roomCode) {
        return this.game(roomCode).collection(collection)
            .get()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (snapshot) { return snapshot.size; }));
    };
    BaseService.prototype.getDocProperty = function (collection, reference, property, roomCode) {
        return this.game(roomCode).collection(collection).doc(reference)
            .valueChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (o) { return !!o ? o[property] : null; }));
    };
    BaseService.prototype.updateDocProperty = function (collection, reference, property, value, roomCode) {
        var data = {};
        data[property] = value;
        this.game(roomCode).collection(collection).doc(reference)
            .update(data);
    };
    BaseService.prototype.addDoc = function (collection, doc, reference, roomCode) {
        this.game(roomCode).collection(collection).doc(reference)
            .set(doc);
    };
    BaseService.prototype.getDocFromArrayIndex = function (collection, index, roomCode) {
        return this.getCollection(collection, roomCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (docArray) { return docArray[index]; }));
    };
    BaseService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"]])
    ], BaseService);
    return BaseService;
}());



/***/ }),

/***/ "./src/services/game.service.ts":
/*!**************************************!*\
  !*** ./src/services/game.service.ts ***!
  \**************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.service */ "./src/services/base.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GameService = /** @class */ (function () {
    function GameService(_base) {
        this._base = _base;
    }
    Object.defineProperty(GameService.prototype, "missionOutcomes", {
        get: function () {
            return this._base.getGameProperty('missionOutcomes');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameService.prototype, "playerCount", {
        get: function () {
            return this._base.getCollectionCount('player');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameService.prototype, "noOfDownvotedTeams", {
        get: function () {
            return this._base.getGameProperty('noOfDownvotedTeams');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameService.prototype, "currentMission", {
        get: function () {
            return this._base.getGameProperty('currentMission');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameService.prototype, "getGame", {
        get: function () {
            return this._base.getGame();
        },
        enumerable: true,
        configurable: true
    });
    GameService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"]])
    ], GameService);
    return GameService;
}());



/***/ }),

/***/ "./src/services/login.service.ts":
/*!***************************************!*\
  !*** ./src/services/login.service.ts ***!
  \***************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_models_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/models/game */ "./src/models/game.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var src_models_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/models/player */ "./src/models/player.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base.service */ "./src/services/base.service.ts");
/* harmony import */ var src_game_variables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/game.variables */ "./src/game.variables.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginService = /** @class */ (function () {
    function LoginService(base) {
        this.base = base;
    }
    LoginService.prototype.joinLobby = function (session) {
        var _this = this;
        var name = session.name;
        var roomCode = session.roomCode;
        console.log("user \"" + name + "\" attempting to join room " + roomCode);
        return new rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"](function (observer) {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["zip"])(_this.doesRoomExist(roomCode), _this.isNameTaken(session), _this.isRoomFull(roomCode), _this.hasGameStarted(roomCode))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
                .subscribe(function (_a) {
                var roomExists = _a[0], nameIsTaken = _a[1], isRoomFull = _a[2], hasGameStarted = _a[3];
                if (!roomExists) {
                    observer.error('This room does not exist');
                }
                if (isRoomFull) {
                    observer.error('This room is full');
                }
                if (nameIsTaken) {
                    observer.error('Name is already taken');
                }
                if (hasGameStarted) {
                    observer.error('Game has already started');
                }
                if (roomExists && !nameIsTaken && !isRoomFull && !hasGameStarted) {
                    _this.base.addDoc('player', Object(src_models_player__WEBPACK_IMPORTED_MODULE_4__["newPlayer"])(session.name), session.name, roomCode);
                }
                observer.complete();
            });
        });
    };
    LoginService.prototype.createLobby = function () {
        var _this = this;
        var roomCode;
        var everythingIsOkay;
        var noOfAttempts = 0;
        return new rxjs__WEBPACK_IMPORTED_MODULE_5__["Observable"](function (observer) {
            do {
                roomCode = _this.randomRoomCode();
                everythingIsOkay = true;
                noOfAttempts++;
                _this.doesRoomExist(roomCode)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])())
                    .subscribe(function (exists) {
                    if (exists) {
                        everythingIsOkay = false;
                    }
                    else {
                        _this.base.addGame(roomCode, Object(src_models_game__WEBPACK_IMPORTED_MODULE_1__["newGame"])());
                        observer.next(roomCode);
                    }
                });
            } while (!everythingIsOkay && noOfAttempts < 200);
            if (!everythingIsOkay) {
                observer.error('Something has gone wrong');
            }
        });
    };
    LoginService.prototype.randomRoomCode = function () {
        return this.base.idGenerator();
    };
    LoginService.prototype.doesRoomExist = function (roomCode) {
        return this.base.doesDocExist('', '', roomCode);
    };
    LoginService.prototype.isNameTaken = function (session) {
        return this.base.doesDocExist('player', session.name, session.roomCode);
    };
    LoginService.prototype.isRoomFull = function (roomCode) {
        return this.base.getCollection('player', roomCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (players) { return players.length >= src_game_variables__WEBPACK_IMPORTED_MODULE_7__["gameVariables"].maxPlayers; }));
    };
    LoginService.prototype.hasGameStarted = function (roomCode) {
        return this.base.getGameProperty('stage', roomCode)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (stage) { return stage !== src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_3__["Stage"].NotBegun; }));
    };
    LoginService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_6__["BaseService"]])
    ], LoginService);
    return LoginService;
}());



/***/ }),

/***/ "./src/services/mission.service.ts":
/*!*****************************************!*\
  !*** ./src/services/mission.service.ts ***!
  \*****************************************/
/*! exports provided: MissionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MissionService", function() { return MissionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.service */ "./src/services/base.service.ts");
/* harmony import */ var src_models_mission__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/models/mission */ "./src/models/mission.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _nav_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nav.service */ "./src/services/nav.service.ts");
/* harmony import */ var src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/enums/stage.enum */ "./src/enums/stage.enum.ts");
/* harmony import */ var src_enums_mission_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/enums/mission-card */ "./src/enums/mission-card.ts");
/* harmony import */ var src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/enums/mission-outcome */ "./src/enums/mission-outcome.ts");
/* harmony import */ var src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/enums/vote.enum */ "./src/enums/vote.enum.ts");
/* harmony import */ var src_game_variables__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/game.variables */ "./src/game.variables.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MissionService = /** @class */ (function () {
    function MissionService(_base, _nav) {
        this._base = _base;
        this._nav = _nav;
    }
    MissionService.prototype.newMission = function (leader, missionNo) {
        this._base.updateGameProperty('leader', leader);
        this._base.addDoc('mission', Object(src_models_mission__WEBPACK_IMPORTED_MODULE_2__["newMission"])(), missionNo.toString());
    };
    MissionService.prototype.boolArray2Number = function (boolArray) {
        // Starts are array of booleans (e.g. [false,true,false, true])
        var binaryArray = boolArray.map(function (bool) { return (+bool); }).reverse(); // Array of 0s and 1s (e.g. [1,0,1,0])
        var charArray = binaryArray.map(function (bit) { return bit.toString(); }); // Array of '0's and '1's (e.g. ['1','0','1','0'])
        var binaryString = charArray.join(''); // String with '0' and '1' chars (e.g. '1010')
        var decimalNumber = parseInt(binaryString, 2); // Decimal value of the binary number (e.g. 10)
        return decimalNumber;
    };
    MissionService.prototype.number2BoolArray = function (decimalNumber) {
        // Starts as decimal value of the number (e.g. 10)
        var binaryString = decimalNumber.toString(2); // String with '0' and '1' chars (e.g. '1010')
        var charArray = binaryString.split(''); // Array of '0's and '1's (e.g. ['1','0','1','0'])
        var binaryArray = charArray.map(function (char) { return parseInt(char); }); // Array of 0s and 1s (e.g. [1,0,1,0])
        var boolArray = binaryArray.map(function (number) { return number ? true : false; }).reverse(); // Array of booleans (e.g. [false,true,false,true])
        return boolArray;
    };
    MissionService.prototype.currentLeader = function () {
        // TODO: maybe refactor this to output the leader number next and do the name logic in the component
        return this._base.getGameProperty('leader');
    };
    MissionService.prototype.currentVotes = function () {
        return this._base.getGameProperty('votes');
    };
    MissionService.prototype.submitVote = function (vote, index) {
        //TODO update so it updates part of an array instead of just adding onto the end
        var _this = this;
        var newVote = vote ? src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_9__["Vote"].upvoted : src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_9__["Vote"].downvoted;
        this.currentVotes()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (votes) { votes[index] = newVote; return votes; }))
            .subscribe(function (votes) { return _this._base.updateGameProperty('votes', votes); });
    };
    MissionService.prototype.getPlayers = function () {
        return this._base.getCollection('player')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (player) { return player.map(function (player) { return player.name; }); }));
    };
    MissionService.prototype.getTeamSize = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(this._base.getCollectionCount('player'), this._base.getGameProperty('currentMission')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (_a) {
            var playerCount = _a[0], missionNo = _a[1];
            return _this.teamSize(playerCount, missionNo);
        }));
    };
    MissionService.prototype.getTeamPick = function () {
        return this._base.getGameProperty('team');
    };
    MissionService.prototype.updateTeamPick = function (teamPick) {
        this._base.updateGameProperty('team', teamPick);
    };
    MissionService.prototype.updateWait = function (wait) {
        this._base.updateGameProperty('wait', wait);
    };
    MissionService.prototype.moveOn = function (hasItGoneAhead) {
        var _this = this;
        this.updateWait(false);
        if (hasItGoneAhead === true) {
            this._base.getCollectionCount('player')
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
                .subscribe(function (count) {
                _this._base.updateGameProperty('playedCards', new Array(count).fill(src_enums_mission_card__WEBPACK_IMPORTED_MODULE_7__["MissionCard"].none));
                _this._nav.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_6__["Stage"].Mission);
            });
        }
        else if (hasItGoneAhead === false) {
            // TODO: add to list of failed missions
            // TODO: add to list of failed votes
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(this._base.getCollectionCount('player'), this._base.getGame())
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
                .subscribe(function (_a) {
                var playerCount = _a[0], game = _a[1];
                var newLeader = (game.leader + 1) % playerCount;
                game.noOfDownvotedTeams = game.noOfDownvotedTeams + 1;
                _this._base.updateGameProperty('leader', newLeader);
                _this._base.updateGameProperty('votes', new Array(playerCount).fill(src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_9__["Vote"].notVoted));
                _this._base.updateGameProperty('noOfDownvotedTeams', game.noOfDownvotedTeams);
                if (_this.isTheGameOver(game)) {
                    _this._nav.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_6__["Stage"].GameOver);
                }
                else {
                    _this._nav.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_6__["Stage"].TeamPick);
                }
            });
        }
        else {
            console.error('Something has gone wrong');
        }
        // move to new page
        //const nextLeader = this._base.getGameProperty('')
    };
    MissionService.prototype.nextMission = function (didItPass) {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["zip"])(this._base.getCollectionCount('player'), this._base.getGame())
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (_a) {
            var playerCount = _a[0], game = _a[1];
            // set new leader
            var newLeader = (game.leader + 1) % playerCount;
            _this._base.updateGameProperty('leader', newLeader);
            // add mission outcome to the Game object
            game.missionOutcomes[game.currentMission] = didItPass
                ? src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_8__["MissionOutcome"].pass
                : src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_8__["MissionOutcome"].fail;
            _this._base.updateGameProperty('missionOutcomes', game.missionOutcomes);
            // wipe current Mission info (keep the team the same)
            _this._base.updateGameProperty('votes', new Array(playerCount).fill(src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_9__["Vote"].notVoted));
            _this._base.updateGameProperty('playedCards', new Array(playerCount).fill(src_enums_mission_card__WEBPACK_IMPORTED_MODULE_7__["MissionCard"].none));
            _this._base.updateGameProperty('noOfDownvotedTeams', 0);
            if (_this.isTheGameOver(game)) {
                _this._nav.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_6__["Stage"].GameOver);
            }
            else {
                _this._base.updateGameProperty('currentMission', game.currentMission + 1);
                _this._nav.goToStage(src_enums_stage_enum__WEBPACK_IMPORTED_MODULE_6__["Stage"].TeamPick);
            }
        });
    };
    MissionService.prototype.updatePlayedCards = function (missionCards) {
        this._base.updateGameProperty('playedCards', missionCards);
    };
    Object.defineProperty(MissionService.prototype, "getPlayedCards", {
        get: function () {
            return this._base.getGameProperty('playedCards');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionService.prototype, "getPlayableCards", {
        get: function () {
            return this._base.getGameProperty('gameType')
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (gameType) { return Object(src_enums_mission_card__WEBPACK_IMPORTED_MODULE_7__["cardsInPlay"])(gameType).map(function (card) { return src_enums_mission_card__WEBPACK_IMPORTED_MODULE_7__["missionCards"][card]; }); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MissionService.prototype, "wait", {
        get: function () {
            return this._base.getGameProperty('wait');
        },
        enumerable: true,
        configurable: true
    });
    MissionService.prototype.teamSize = function (noOfPlayers, missionNo) {
        return src_game_variables__WEBPACK_IMPORTED_MODULE_10__["gameVariables"].missionSizes[noOfPlayers - 5][missionNo];
    };
    MissionService.prototype.isTheGameOver = function (game) {
        var missionOutcomes = game.missionOutcomes;
        var noOfDownvotedTeams = game.noOfDownvotedTeams;
        var noOfMissionsToWin = src_game_variables__WEBPACK_IMPORTED_MODULE_10__["gameVariables"].noOfMissionsToWin;
        var maxNoOfVotesPerMission = src_game_variables__WEBPACK_IMPORTED_MODULE_10__["gameVariables"].maxNoOfVotesPerMission;
        var noOfFails = missionOutcomes.filter(function (outcome) { return outcome === src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_8__["MissionOutcome"].fail; }).length;
        var noOfPasses = missionOutcomes.filter(function (outcome) { return outcome === src_enums_mission_outcome__WEBPACK_IMPORTED_MODULE_8__["MissionOutcome"].pass; }).length;
        if (noOfFails >= noOfMissionsToWin || noOfPasses >= noOfMissionsToWin || noOfDownvotedTeams >= maxNoOfVotesPerMission) {
            return true;
        }
        else {
            return false;
        }
    };
    MissionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"], _nav_service__WEBPACK_IMPORTED_MODULE_5__["NavService"]])
    ], MissionService);
    return MissionService;
}());



/***/ }),

/***/ "./src/services/nav.service.ts":
/*!*************************************!*\
  !*** ./src/services/nav.service.ts ***!
  \*************************************/
/*! exports provided: NavService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavService", function() { return NavService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/services/base.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/enums/vote.enum */ "./src/enums/vote.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavService = /** @class */ (function () {
    function NavService(base) {
        this.base = base;
        this.isConnectedToARoom$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
    }
    NavService.prototype.connectToRoom = function (roomCode) {
        this.base.connectToRoom(roomCode);
        this.isConnectedToARoom$.next(true);
    };
    Object.defineProperty(NavService.prototype, "currentStage", {
        get: function () {
            return this.base.getGameProperty('stage');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavService.prototype, "currentPlayers", {
        get: function () {
            return this.base.getCollection('player');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavService.prototype, "startTime", {
        get: function () {
            return this.base.getGameProperty('startTime');
        },
        enumerable: true,
        configurable: true
    });
    NavService.prototype.goToStage = function (stage) {
        this.base.updateGameProperty('stage', stage);
    };
    NavService.prototype.startGame = function () {
        var _this = this;
        var countdownMilliseconds = 4000;
        var currentTime = new Date().getTime();
        this.base.updateGameProperty('startTime', currentTime + countdownMilliseconds);
        this.base.getCollectionCount('player')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (playerCount) {
            _this.base.updateGameProperty('votes', new Array(playerCount).fill(src_enums_vote_enum__WEBPACK_IMPORTED_MODULE_4__["Vote"].notVoted));
            _this.base.updateGameProperty('team', new Array(playerCount).fill(false));
        });
    };
    NavService.prototype.cancel = function () {
        this.base.updateGameProperty('startTime', null);
    };
    NavService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], NavService);
    return NavService;
}());



/***/ }),

/***/ "./src/services/role.service.ts":
/*!**************************************!*\
  !*** ./src/services/role.service.ts ***!
  \**************************************/
/*! exports provided: RoleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleService", function() { return RoleService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.service */ "./src/services/base.service.ts");
/* harmony import */ var src_enums_role_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/enums/role.enum */ "./src/enums/role.enum.ts");
/* harmony import */ var src_enums_team_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/enums/team.enum */ "./src/enums/team.enum.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RoleService = /** @class */ (function () {
    function RoleService(base) {
        this.base = base;
    }
    RoleService.prototype.assignRoles = function () {
        var _this = this;
        this.currentPlayers()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
            .subscribe(function (players) {
            var unassignedPlayers = players;
            var allRoles = _this.allRoles(players.length);
            while (unassignedPlayers.length > 0) {
                var whichPlayerIndexToAssign = _this.randomInt(unassignedPlayers.length - 1);
                var roleToAssign = allRoles.pop();
                var whichPlayerToAssign = unassignedPlayers.splice(whichPlayerIndexToAssign, 1)[0];
                _this.base.updateDocProperty('player', whichPlayerToAssign.name, 'role', roleToAssign.role);
                _this.base.updateDocProperty('player', whichPlayerToAssign.name, 'team', roleToAssign.team);
            }
        });
    };
    RoleService.prototype.currentPlayers = function () {
        return this.base.getCollection('player');
    };
    RoleService.prototype.randomInt = function (max) {
        var randomInt = Math.floor(Math.random() * (max + 1));
        if (randomInt > max) { // if Math.random() returns exactly 1
            return max;
        }
        return randomInt;
    };
    RoleService.prototype.allRoles = function (noOfPlayers) {
        var roleArray = Array(noOfPlayers);
        var noOfEachTypeArray = [
            { noOfPlainResistance: 3, noOfPlainSpies: 2 },
            { noOfPlainResistance: 4, noOfPlainSpies: 2 },
            { noOfPlainResistance: 4, noOfPlainSpies: 3 },
            { noOfPlainResistance: 5, noOfPlainSpies: 3 },
            { noOfPlainResistance: 6, noOfPlainSpies: 3 },
            { noOfPlainResistance: 6, noOfPlainSpies: 4 }
        ];
        var noOfEachType = noOfEachTypeArray[noOfPlayers - 5];
        var plainResistance = {
            name: null,
            role: src_enums_role_enum__WEBPACK_IMPORTED_MODULE_2__["Role"].regular,
            team: src_enums_team_enum__WEBPACK_IMPORTED_MODULE_3__["Team"].resistance
        };
        var plainSpy = {
            name: null,
            role: src_enums_role_enum__WEBPACK_IMPORTED_MODULE_2__["Role"].regular,
            team: src_enums_team_enum__WEBPACK_IMPORTED_MODULE_3__["Team"].spy
        };
        var allPlainResistance = Array(noOfEachType.noOfPlainResistance).fill(plainResistance);
        var allPlainSpies = Array(noOfEachType.noOfPlainSpies).fill(plainSpy);
        var allPlayers = allPlainResistance.concat(allPlainSpies);
        if (allPlayers.length !== noOfPlayers) {
            alert('wrong number of players');
        }
        return allPlayers;
    };
    RoleService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_1__["BaseService"]])
    ], RoleService);
    return RoleService;
}());



/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\user\Projects\resistance-app\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map