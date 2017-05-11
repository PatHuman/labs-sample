import { Component, OnInit, Input } from '@angular/core';
//import Vimeo from '../../../node_modules/@vimeo/player/dist/player';
//import {YT} from 'ng2-youtube-player';
//import {Player} from '@vimeo/player';   
import { VimeoService } from '../vimeo.service';


@Component({
  selector: 'video',
  templateUrl: './video.html',
  styleUrls: ['./vplayer.component.css',
          '../../assets/css/app.css',
  			  '../../assets/css/font.css',
  			  '../../assets/css/font-awesome.min.css',
  			  '../../assets/css/simple-line-icons.css'
  			  ]
})
export class VideoComponent implements OnInit {

	@Input() link:string;

	src = "https://player.vimeo.com/45347638";
	constructor(){}
	 ngOnInit() {}
}