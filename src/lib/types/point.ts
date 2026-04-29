import { PointAction } from '../enums/point.enum';

export interface PointHistory {
    _id: string;
    memberId: string;
    action: PointAction;
    delta: number;
    refId?: string;
    createdAt: Date;
}

export interface PointHistoryInput {
    memberId: string;
    action: PointAction;
    delta: number;
    refId?: string;
}

export interface PointInquiry {
    page: number;
    limit: number;
    memberId: string;
}
