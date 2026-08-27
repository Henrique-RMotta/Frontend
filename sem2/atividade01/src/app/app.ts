import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { HeroBanner } from './hero-banner/hero-banner';
import { Sidebar } from './sidebar/sidebar';
import { CardProduct } from './card-product/card-product';
import { Card } from './card/card';
import { Footer } from "./footer/footer";
@Component({
  imports: [RouterOutlet, Header, HeroBanner, Sidebar, CardProduct, Card, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('atividade01');
}
