import { Component, Input } from '@angular/core';
import { ArtisansService } from '../artisans.service';
import { Artisan } from '../artisan.model';
import { ActivatedRoute } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-artisans-sheet',
  standalone: true,
  imports: [],
  templateUrl: './artisans-sheet.component.html',
  styleUrl: './artisans-sheet.component.css'
})
export class ArtisansSheetComponent {
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
      this.artisan = this.artisanService.getArtisanById(artisanId);
    }
  }
  
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_ptlbqr8', 'template_16vskto', e.target as HTMLFormElement, '-zAyczA1-KABOJJnO')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        alert("SUCCESS!");
      }, (error) => {
        console.log(error.text);
        alert("FAILED...")
      });
    this.contactForm.reset();
  }

}
