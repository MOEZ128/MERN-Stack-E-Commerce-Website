// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Forms
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Router
import { Router } from '@angular/router';

// Services
import { BookService } from '../../../core/services/book.service';

// Custom Validators
import { isUrlValidator } from '../../../core/directives/is-url.directive';
import { isIsbnValidator } from '../../../core/directives/is-isbn.directive';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  createBookForm: FormGroup;
  selectedFile: File = null;


  constructor(
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.createBookForm = new FormGroup({
      'title': new FormControl('', [
        Validators.required
      ]),
      'author': new FormControl('', [
        Validators.required
      ]),
      'genre': new FormControl('', [
        Validators.required
      ]),
      'year': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      'cover': new FormControl('', [
        Validators.required,
        isUrlValidator
      ]),
      'url': new FormControl('', [
      ]),
      'isbn': new FormControl('', [
        Validators.required,
        isIsbnValidator
      ]),
      'pagesCount': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      'price': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }
  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }
  
  onSubmit(): void {
    const formData = new FormData();
    formData.append('url', this.selectedFile, this.selectedFile.name);
    formData.append('title', this.createBookForm.get('title').value);
  formData.append('author', this.createBookForm.get('author').value);
  formData.append('genre', this.createBookForm.get('genre').value);
  formData.append('year', this.createBookForm.get('year').value);
  formData.append('description', this.createBookForm.get('description').value);
  formData.append('cover', this.createBookForm.get('cover').value);
  formData.append('isbn', this.createBookForm.get('isbn').value);
  formData.append('pagesCount', this.createBookForm.get('pagesCount').value);
  formData.append('price', this.createBookForm.get('price').value);
  
  this.bookService
  .createBook(formData)
  .subscribe((res) => {
    this.router.navigate([`/book/details/${res.data._id}`]);
  });
}

  get title(): AbstractControl {
    return this.createBookForm.get('title');
  }

  get author(): AbstractControl {
    return this.createBookForm.get('author');
  }

  get genre(): AbstractControl {
    return this.createBookForm.get('genre');
  }

  get year(): AbstractControl {
    return this.createBookForm.get('year');
  }

  get description(): AbstractControl {
    return this.createBookForm.get('description');
  }

  get cover(): AbstractControl {
    return this.createBookForm.get('cover');
  }

  get url(): AbstractControl {
    return this.createBookForm.get('url');
  }
  get isbn(): AbstractControl {
    return this.createBookForm.get('isbn');
  }

  get pagesCount(): AbstractControl {
    return this.createBookForm.get('pagesCount');
  }

  get price(): AbstractControl {
    return this.createBookForm.get('price');
  }

}
