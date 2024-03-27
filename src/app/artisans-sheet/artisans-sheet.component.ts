import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailService } from '../email.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OpinionPipe } from '../opinion.pipe';

@Component({
  selector: 'app-artisans-sheet',
  standalone: true,
  imports: [CommonModule, OpinionPipe, ReactiveFormsModule],
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
    private sanitizer: DomSanitizer,
  ) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      object: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  //function which disinfect and secure data.
  sanitizeHtml(unsafeHtml: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
  }

  //Function to display the craftsman having the same id as the one in the url
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

  //Function to create an alert when the form is submitted in order to know if the action is carried out or not
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

  //Function using EmailService by sending it the form data and which reacts based on the response
  onSubmit(e: Event) {
    e.preventDefault();
    if (this.sanitizeHtml(this.contactForm)) {
      const templateParams = {
        firstname: this.contactForm.value.firstname,
        lastname: this.contactForm.value.lastname,
        email: this.contactForm.value.email,
        object: this.contactForm.value.object,
        comments: this.contactForm.value.comments,
      };
      this.emailService
        .sendEmail(templateParams)
        .then(() => {
          console.log('Email sent successfully');
          this.contactForm.reset();
          this.alertEmail('Votre message a été envoyé !', 'success');
        })
        .catch((error) => {
          console.error('Failed to send email', error);
          this.alertEmail(
            "ERREUR ! Votre message n'a pas été envoyé !",
            'danger',
          );
        });
    } else {
      console.log('Code malveillant');
    }
  }
}
