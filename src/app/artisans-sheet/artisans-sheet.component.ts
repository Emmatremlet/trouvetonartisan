import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Component, Input, NgIterable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailService } from '../email.service';

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
    private emailService: EmailService,
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

  public alertEmail(message: any, type: any) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')!;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');
    alertPlaceholder.append(wrapper);
  }

  
  onSubmit(e: Event) {
    e.preventDefault();

    const alertTrigger = document.getElementById('liveAlertBtn')!;
    this.emailService
      .sendEmail(this.contactForm)
      .then(() => {
        console.log('Email sent successfully');
        this.contactForm.reset();
        alertTrigger.addEventListener('click', () => {
          this.alertEmail('Votre message a été envoyé !', 'success');
        });
      })
      .catch((error) => {
        console.error('Failed to send email', error);
        alertTrigger.addEventListener('click', () => {
          this.alertEmail(
            "ERREUR ! Votre message n'a pas été envoyé !",
            'danger',
          );
        });
      });
  }
}
