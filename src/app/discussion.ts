import { Injectable } from "@angular/core";

@Injectable()
export class Discussion {
  id: number;
  town: string;
  street: string;
  user: string;
  subject: string;
  message: string;
  created: number;
}
