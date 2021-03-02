import { Component, OnInit } from '@angular/core';
import { IMusic } from '../interface/music.interface';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {


  albumsName: Array<any> = []
  albums: Array<IMusic> = [];
  searchName: string = '';
  likes: Array<any> = [];

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.loadAlbum('tag');
    this.likeLength();
  }


  loadAlbum(tag: string): void {
    this.musicService.getAlbum(tag).subscribe(data => {
      for (let i = 0; i < data.albums.album.length; i++) {
        const albumImages = data.albums.album[i].image;
        const albumName = data.albums.album[i].name;
        this.albumsName.push(albumName)
        for (let albumImage of albumImages) {
          if (albumImage.size === "large")
            this.albums.push(albumImage['#text']);
          // console.log(this.albums)
        }
      }
    })
  }


  like(): void {
    this.musicService.fav.next('');
  }


  private likeLength(): void {
    this.musicService.fav.subscribe(data => {
      this.likes.push(data)
    })
  }


}


