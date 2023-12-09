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
  books: Book[];
  // Other properties as needed, similar to BookStoreComponent

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
    // Implement this method to fetch books by genre
    // You might need to modify or create a new service method to fetch books by genre
  }
}