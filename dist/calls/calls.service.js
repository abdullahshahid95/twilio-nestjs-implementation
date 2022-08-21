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
exports.CallsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const typeorm_2 = require("typeorm");
const calls_entity_1 = require("./calls.entity");
require("dotenv/config");
let CallsService = class CallsService {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    gather(twiml) {
        const gatherNode = twiml.gather({ numDigits: 1 });
        gatherNode.say('For customer service representative, press 1. For voicemail, press 2.');
        twiml.hangup();
    }
    async getAllCalls() {
        return await this.callRepository.find();
    }
    async receiveCall(inboudCall) {
        const twiml = new VoiceResponse();
        let existing = await this.callRepository.findOneBy({ call_sid: inboudCall.CallSid });
        if (!existing) {
            await this.callRepository.insert({
                call_sid: inboudCall.CallSid,
                from: inboudCall.From,
                to: inboudCall.To,
                status: inboudCall.CallStatus,
            });
        }
        if (inboudCall.Digits) {
            switch (inboudCall.Digits) {
                case '1':
                    twiml.dial('+923327819342');
                    twiml.say('Goodbye');
                    break;
                case '2':
                    twiml.say('Hello. Please leave a message after the beep.');
                    twiml.record({
                        recordingStatusCallbackEvent: ['completed'],
                        recordingStatusCallbackMethod: 'POST',
                        recordingStatusCallback: 'https://evening-refuge-01387.herokuapp.com/calls/recording',
                    });
                    twiml.hangup();
                    break;
                default:
                    twiml.say("Sorry, I don't understand that choice.");
                    twiml.pause();
                    this.gather(twiml);
                    break;
            }
        }
        else {
            this.gather(twiml);
        }
        return twiml.toString();
    }
    async updateCallStatus(inboudCall) {
        const twiml = new VoiceResponse();
        await this.callRepository.update({ call_sid: inboudCall.CallSid }, {
            status: inboudCall.CallStatus,
            duration: inboudCall.CallDuration
        });
        return twiml.toString();
    }
    async receiveRecording(recording) {
        const twiml = new VoiceResponse();
        if (recording.RecordingUrl) {
            await this.callRepository.update({ call_sid: recording.CallSid }, {
                recording_url: recording.RecordingUrl
            });
        }
        return twiml.toString();
    }
    async testDb() {
        return process.env.RECORDING_CALLBACK + "-----" + process.env.CALLING_NUMBER;
        const twiml = new VoiceResponse();
        console.log(twiml);
        return true;
        let result = await this.callRepository.insert({
            call_sid: '123abc',
            from: '1234',
            to: '1234',
            duration: 30,
            status: 'in-progress'
        });
        await this.callRepository.update({ call_sid: '123abc' }, {
            status: 'Completed',
            recording_url: 'google.com'
        });
        console.log("\n\nresult", result);
        console.log("\n\n");
        return true;
    }
};
CallsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calls_entity_1.Call)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CallsService);
exports.CallsService = CallsService;
//# sourceMappingURL=calls.service.js.map