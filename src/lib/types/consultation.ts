import { ConsultationStatus, PreferredContact } from '../enums/consultation.enum';

export interface Consultation {
    _id: string;
    carId: string;
    memberId?: string;
    name: string;
    email: string;
    phone: string;
    preferredContact: PreferredContact;
    message?: string;
    status: ConsultationStatus;
    assignedTo?: string;
    adminNote?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ConsultationInput {
    carId: string;
    memberId?: string;
    name: string;
    email: string;
    phone: string;
    preferredContact: PreferredContact;
    message?: string;
}

export interface ConsultationUpdateInput {
    _id: string;
    status?: ConsultationStatus;
    assignedTo?: string;
    adminNote?: string;
}

export interface ConsultationInquiry {
    page: number;
    limit: number;
    status?: ConsultationStatus;
}
