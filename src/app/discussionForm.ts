import { Injectable } from "@angular/core";

@Injectable()
export class DiscussionForm {
  town: string;
  street: string;
  user: string;
  subject: string;
  message: string;
}
