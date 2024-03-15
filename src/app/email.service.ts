import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  sendEmail(templateParams: any): Promise<any> {
    return emailjs
      .send(
        'service_ptlbqr8',
        'template_16vskto',
        templateParams,
        '-zAyczA1-KABOJJnO',
      )
      .then(
        (response) => {
          console.log('Success!', response.status, response.text);
          return response;
        },
        (error) => {
          console.error('Failed...', error);
          throw error;
        },
      );
  }
}
