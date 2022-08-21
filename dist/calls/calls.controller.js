"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsController = void 0;
const common_1 = require("@nestjs/common");
const InboundCallDto_1 = require("./InboundCallDto");
const RecordingDto_1 = require("./RecordingDto");
const calls_service_1 = require("./calls.service");
let CallsController = class CallsController {
    constructor(callsService) {
        this.callsService = callsService;
    }
    async getCalls() {
        const callsList = await this.callsService.getAllCalls();
        return { callsList };
    }
    async receiveCall(inboudCall, res) {
        const response = await this.callsService.receiveCall(inboudCall);
        res.set({ 'Content-Type': 'text/xml' });
        return res.send(response);
    }
    async updateCallStatus(inboudCall, res) {
        const response = await this.callsService.updateCallStatus(inboudCall);
        res.set({ 'Content-Type': 'text/xml' });
        return res.send(response);
    }
    async receiveRecording(recording, res) {
        const response = await this.callsService.receiveRecording(recording);
        res.set({ 'Content-Type': 'text/xml' });
        return res.send(response);
    }
    async testDb(res) {
        const response = await this.callsService.testDb();
        return res.send(response);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "getCalls", null);
__decorate([
    (0, common_1.Post)('/inbound'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InboundCallDto_1.InboudCallDto, Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "receiveCall", null);
__decorate([
    (0, common_1.Post)('/update/call'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InboundCallDto_1.InboudCallDto, Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "updateCallStatus", null);
__decorate([
    (0, common_1.Post)('/recording'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecordingDto_1.RecordingDto, Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "receiveRecording", null);
__decorate([
    (0, common_1.Get)('/test-db'),
    __param(0, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallsController.prototype, "testDb", null);
CallsController = __decorate([
    (0, common_1.Controller)('calls'),
    __metadata("design:paramtypes", [calls_service_1.CallsService])
], CallsController);
exports.CallsController = CallsController;
//# sourceMappingURL=calls.controller.js.map