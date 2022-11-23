import { Role } from './role.model';

export class Worker {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    businessName: string;
    phoneNumber: string;
    address: string;
    services: Array<string>;
    created:Date;
}