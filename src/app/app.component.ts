import {Component, OnInit} from '@angular/core';
import {XiteService} from "./xite.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'xite-app';
  data: any
  current_data: any
  searchedText: string = ''
  genres = new FormControl();
  genreList: any[] = [];
  selectedGenres: any[] = [];

  constructor(private xiteservice: XiteService) {

  }

  ngOnInit(): void {
    this.getDataset()
  }

  getDataset() {
    this.xiteservice.getDataset().subscribe(res => {

      this.data = res;
      this.genreList = res.genres;
      this.current_data = res.videos;
    })
  }

  seached() {
    this.current_data = this.data.videos.filter((x: any) => {
        return ((x.title.indexOf && x.title.toLowerCase().indexOf(this.searchedText.toLowerCase()) > -1) || (x.artist.indexOf && x.artist.toLowerCase().indexOf(this.searchedText.toLowerCase()) > -1))
      }
    )
  }


  test(event: any) {
    if (!event) {
      if (this.selectedGenres.length > 0)
        this.current_data = this.data.videos.filter((x: any) => {
            return this.selectedGenres.map(g => g.id).indexOf(x.genre_id) > -1
          }
        )

      else {
        this.current_data = this.data.videos;
      }
    }
  }
}
