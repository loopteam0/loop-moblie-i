import { Component, OnInit } from '@angular/core';
import { TorrentsService } from '../../../services/torrents.service';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.page.html',
  styleUrls: ['./musics.page.scss'],
})
export class MusicsPage implements OnInit {

  constructor(public torrentApi: TorrentsService) { }

  ngOnInit() {
    
    this.torrentApi.getTorrents('1080', 'Movies', 50).then(
      res => console.log(res)
      
    )
  }

  
}
