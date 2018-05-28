"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var environment_prod_1 = require("../../environments/environment.prod");
var MedicalService = /** @class */ (function () {
    function MedicalService(http) {
        this.http = http;
        this.medicalTransactions = [];
        this.medicalTransactionsChanged = new rxjs_1.Subject();
    }
    MedicalService.prototype.getMedicalTransactions = function (id) {
        var _this = this;
        this.http.get(environment_prod_1.environment.apiUrl + 'medical/' + id).subscribe(function (transactions) {
            _this.medicalTransactions = transactions;
            _this.emitMedicalTransactionsChanged();
        });
    };
    MedicalService.prototype.emitMedicalTransactionsChanged = function () {
        this.medicalTransactionsChanged.next(this.medicalTransactions.slice());
    };
    return MedicalService;
}());
exports.MedicalService = MedicalService;
//# sourceMappingURL=medical.service.js.map