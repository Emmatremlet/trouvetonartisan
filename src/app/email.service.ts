import { Injectable } from '@angular/core';
import * as emailjs from '@emailjs/browser';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root',
})

//Service allowing you to send an email using emailjs
export class EmailService {
  constructor() {}
  private serviceId: string = environment.EMAILJS_SERVICE_ID;
  private templateId: string = environment.EMAILJS_TEMPLATE_ID;
  private userId: string = environment.EMAILJS_USER_ID;

  sendEmail(templateParams: any): Promise<any> {
    return emailjs
      .sendForm(this.serviceId, this.templateId, templateParams, this.userId)
      .then(
        (response: any) => {
          console.log('Success!', response.status, response.text);
          return response;
        },
        (error: any) => {
          console.error('Failed...', error);
          throw error;
        },
      );
  }
}
