// books-by-genre.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-books-by-genre',
  templateUrl: './books-by-genre.component.html',
  styleUrls: ['./books-by-genre.component.css']
})
export class BooksByGenreComponent implements OnInit {
  genre: string;
  books: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genre = params['genre'];
      this.fetchBooksByGenre(this.genre);
    });
  }

  fetchBooksByGenre(genre: string): void {
    this.bookService.getBooksByGenre(genre).subscribe(
      (response) => {
        this.books = response.data;
      },
      (error) => {
        console.error('Error fetching books by genre:', error);
      }
    );
  }
}