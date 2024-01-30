import { Component, Input } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as nodemailer from 'nodemailer';



@Component({
  selector: 'app-artisans-sheet',
  standalone: true,
  imports: [],
  templateUrl: './artisans-sheet.component.html',
  styleUrl: './artisans-sheet.component.css'
})
export class ArtisansSheetComponent {
  favicon: any = '../assets/favicon.png';
  @Input() name: string = ''
  @Input() job: string = ''
  @Input() category: string = ''
  @Input() location: string = ''
  @Input() image: any 
  @Input() description: string = ''
  @Input() opinion: string = ''

  artisan: Artisan | undefined;

  contactForm: FormGroup;



  constructor(private artisanService: ArtisansService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      object: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const artisanId = +idParam;
      this.artisanService.getArtisanById(artisanId).subscribe((artisan) => {
        this.artisan = artisan;
      });
    }
  }

  
  sendEmail() {
    const formData = this.contactForm.value;

    const transporter = nodemailer.createTransport({
      host: 'localhost', 
      port: 1025,
      secure: false,
      auth: {
        user: '', 
        pass: '' 
      }
    });

    const mailOptions = {
      from: formData.email,
      to: 'destination@example.com', 
      subject: formData.object,
      text: `De: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\n${formData.comments}`
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }

}
