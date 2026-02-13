import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Blog } from './components/blog/blog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Blog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BloggingSystem');
}
