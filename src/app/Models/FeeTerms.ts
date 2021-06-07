export interface FeeTerms {
    id: number;
    ClassLevel: string;
    Stander: string;
    Section: string;
    FeeType: string;
    FeeAmt: number;
    Term1: number;
    Term12: number;
    Term1Paid: number;
    Term2Paid: number;
    Term1DueAmt: number;
    Term2DueAmt: number;
    Term1From: Date;
    Term1To: Date;
    Term2From: Date;
    Term2To: Date;
    Term1dateOfPay: Date;
    Term2dateOfPay: Date;   

    feeParticular:FeeTerms[];
}