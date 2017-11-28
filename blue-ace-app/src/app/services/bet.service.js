"use strict";
/**
 * Created by matthewRanftle1 on 11/21/17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var BetService = (function () {
    function BetService(http) {
        this.http = http;
        this.betUrl = 'http://localhost:8000/bet/';
    }
    BetService.prototype.getBets = function () {
        var currentUser = localStorage.getItem('currentUser');
        var headers = new http_1.Headers({ 'Authorization': currentUser,
            'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.betUrl, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BetService.prototype.saveBet = function (bet) {
        var currentUser = localStorage.getItem('currentUser');
        var body = JSON.stringify({ bet: bet });
        var headers = new http_1.Headers({ 'Authorization': currentUser,
            'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post(this.betUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return 'Server error'; })
            .subscribe();
    };
    //more detailed error message to come, move to error file
    BetService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return BetService;
}());
BetService = __decorate([
    core_1.Injectable()
], BetService);
exports.BetService = BetService;
