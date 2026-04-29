import { ViewGroup } from '../enums/view.enum';

export interface View {
    _id: string;
    viewGroup: ViewGroup;
    memberId: string;
    viewRefId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ViewInput {
    memberId: string;
    viewRefId: string;
    viewGroup: ViewGroup;
}
