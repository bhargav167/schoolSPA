import { EmpRegister } from '../EmpRegister';

export interface StudentTimeTable {
    Id: number;
    Classes: string;
    Sec: string;
    WeekDay: string;
    Subject: number;
    teachersId: number;
    timefrom: string;
    timeTo: string;
    RoomNo: number;
    teacher:EmpRegister;
}