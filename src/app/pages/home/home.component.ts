import { Component, OnInit } from '@angular/core';
import { pokemonImageTrigger } from 'src/app/animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [pokemonImageTrigger]
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();

  title = "";

  ngOnInit(): void {

    this.textWriter("Encontre todos os seus Pokémons favoritos");
  }

  textWriter(title: string){
    let titleContent = title;

    for(let i = 0; i < titleContent.length; i++){
      setTimeout(() => {
        this.title += titleContent[i]
      }, 100 * i)
    }
  }

}
