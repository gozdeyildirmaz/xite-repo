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
  years = new FormControl();
  yearList: any[] = [];
  selectedYears: any[] = [];
  isErrorCase= false

  constructor(private xiteservice: XiteService) {

  }

  ngOnInit(): void {
    this.getDataset()
  }

  getDataset() {
    this.xiteservice.getDataset().subscribe(res => {
      this.isErrorCase = false;
      this.data = res;
      this.genreList = res.genres;
      this.current_data = res.videos;

      this.yearList = res.videos.map((x: any) => x.release_year)
      this.yearList = this.yearList.filter((x, y) => this.yearList.indexOf(x) == y)
      this.yearList.sort();

    }, error => {
      this.isErrorCase = true;
    })

  }

  seached() {
    this.applyFilter();
  }


  changed(event: any) {
    if (!event) {
      this.applyFilter();

    }
  }

  applyFilter() {
    this.current_data = this.data.videos;
    if (this.selectedGenres.length > 0)
      this.current_data = this.current_data.filter((x: any) => {
          return this.selectedGenres.map(g => g.id).indexOf(x.genre_id) > -1
        }
      )

    if (this.selectedYears.length > 0)
      this.current_data = this.current_data.filter((x: any) => {
          return this.selectedYears.indexOf(x.release_year) > -1
        }
      )

    if (this.searchedText)
      this.current_data = this.current_data.filter((x: any) => {
          return ((x.title.indexOf && x.title.toLowerCase().indexOf(this.searchedText.toLowerCase()) > -1) || (x.artist.indexOf && x.artist.toLowerCase().indexOf(this.searchedText.toLowerCase()) > -1))
        }
      )

  }


}


