import { Injectable } from '@angular/core';

@Injectable()
export class User {
  id: number;
  user: string;
  password: string;
  isAdmin: boolean;
}
