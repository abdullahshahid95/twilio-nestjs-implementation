import { Response as Res } from 'express';
import { InboudCallDto } from './InboundCallDto';
import { RecordingDto } from './RecordingDto';
import { CallsService } from './calls.service';
export declare class CallsController {
    private readonly callsService;
    constructor(callsService: CallsService);
    getCalls(): Promise<{
        callsList: import("./calls.entity").Call[];
    }>;
    receiveCall(inboudCall: InboudCallDto, res: any): Promise<Res>;
    updateCallStatus(inboudCall: InboudCallDto, res: any): Promise<Res>;
    receiveRecording(recording: RecordingDto, res: any): Promise<Res>;
    testDb(res: any): Promise<any>;
}
