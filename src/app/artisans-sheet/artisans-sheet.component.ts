import { Component, Input } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as nodemailer from 'nodemailer';
import { CommonModule } from '@angular/common';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';



@Component({
  selector: 'app-artisans-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artisans-sheet.component.html',
  styleUrl: './artisans-sheet.component.css',
})
export class ArtisansSheetComponent {
  favicon: any = '../assets/favicon.png';
  halfStar: any = '../assets/half-star.png';

  @Input() name: string = '';
  @Input() job: string = '';
  @Input() category: string = '';
  @Input() location: string = '';
  @Input() image: any;
  @Input() description: string = '';

  artisan: Artisan | undefined;

  contactForm: FormGroup;

  constructor(
    private artisanService: ArtisansService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      object: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.artisanService.getArtisans().subscribe((data) => {
        this.artisan = data.find((artisan) => artisan.id === id);
      });
    } else {
      console.error('ID non défini');
    }
  }

  opinion(artisan: any) {
    let wholePart = Math.floor(artisan.note);
    let decimal = artisan.note - wholePart;
    let halfPart = 0;
    let empty = 0;
    if (decimal != 0) {
      halfPart = 1;
    }

    if (halfPart + wholePart != 5) {
      empty = 5 - (halfPart + wholePart);
    }
    const fullnote = Array(wholePart).fill(0);
    const halfnote = Array(halfPart).fill(0);
    const emptynote = Array(empty).fill(0);

    const note = [fullnote, halfnote, emptynote];

    return note;
  }

  sendEmail() {
  //   const formData = this.contactForm.value;

  //   const transporter = nodemailer.createTransport({
  //     host: 'localhost',
  //     port: 1025,
  //     secure: false,
  //     auth: {
  //       user: '',
  //       pass: ''
  //     }
  //   });

  //   const mailOptions = {
  //     from: formData.email,
  //     to: 'destination@example.com',
  //     subject: formData.object,
  //     text: `De: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\n${formData.comments}`
  //   };

  //   transporter.sendMail(mailOptions, (error: any, info: any) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //   });
  }
}
