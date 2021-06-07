export interface FeeParticular {
    id: number;
    ClassLevel: string;
    Stander: string;
    Section: string;
    FeeType: string;
    FeeAmt:string;
    stuId:number;
    Term1:number;
    Term12:Number; 
    Term1Paid:number;
    Term2Paid:Number;
    Term1DueAmt:number;
    Term2DueAmt:number;
    term1From:Date;
    term2From:Date;
    term2To:Date;
    term1To:Date;
    term1dateOfPay:Date;
    Term2dateOfPay:Date;
    SessionYear:string; 
}