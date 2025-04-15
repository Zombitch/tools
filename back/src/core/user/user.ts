import { DataElement } from "../abstract/data-element";

export interface User extends DataElement{
    username?: string;
    password?: string;
    email?: string;
}