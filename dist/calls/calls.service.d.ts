import { Repository } from 'typeorm';
import { Call } from './calls.entity';
import { InboudCallDto } from './InboundCallDto';
import { RecordingDto } from './RecordingDto';
import 'dotenv/config';
export declare class CallsService {
    private callRepository;
    constructor(callRepository: Repository<Call>);
    gather(twiml: any): void;
    getAllCalls(): Promise<Call[]>;
    receiveCall(inboudCall: InboudCallDto): Promise<string>;
    updateCallStatus(inboudCall: InboudCallDto): Promise<string>;
    receiveRecording(recording: RecordingDto): Promise<string>;
    testDb(): Promise<string | true>;
}
