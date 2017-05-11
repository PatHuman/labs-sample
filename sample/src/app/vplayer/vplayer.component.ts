import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
//import Vimeo from '../../../node_modules/@vimeo/player/dist/player';
//import {YT} from 'ng2-youtube-player';
//import Player from '@vimeo/player'; 
import { WindowRefService } from '../window-ref.service';
 

import { VimeoService } from '../vimeo.service';


function _window(): any {
  // return the native window obj
  return window;
}

@Component({
  selector: 'vplayer',
  templateUrl: './vplayer.component.html',
  styleUrls: ['./vplayer.component.css',
          '../../assets/css/app.css',
  			  '../../assets/css/font.css',
  			  '../../assets/css/font-awesome.min.css',
  			  '../../assets/css/simple-line-icons.css'
  			  ]
})
export class VplayerComponent implements OnInit ,AfterViewInit{

 // Vimeo = Window.Vimeo;
  vimeoPlayer:any;
  player:any;
  playlist:any[];
  inplay:any;
  otest = [  
        '67330791',
        '51516180',
        '47474415',
        '45347638',
        '45625901'];
  
	 
      sources:Array<Object>;

    constructor(private vservice:VimeoService,private window:WindowRefService, private el:ElementRef) {
        this.sources = [
        
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ];

    }



  private id: string = '4o3TSkGpQ9U';

    savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
    }
  onStateChange(event){
    console.log('player state', event.data);
  }
  ngOnInit() {

    // console.log(this.el.)
    this.playlist =  this.vservice.buildPlaylist(this.otest);
    console.log(this.playlist)




/*     const player = new Player('handstick', {
    id: 19231868,
    width: 640
});

player.on('play', function() {
    console.log('played the video!');
});*/
   }

 @ViewChild('vimeo')   viemo;
 
    ngAfterViewInit() {
        

     let options = {
      id:  "67330791",
      //width:this.viemo.nativeElement.offsetWidth
      //autoplay:true
      
     };

    this.vimeoPlayer = new this.window.nativeWindow.Vimeo.Player('vimeo',options);
    
     
    this.vimeoPlayer.on('play', function() {
        console.log('played the handstick video!');
    });
    }


  playVideo(){

    this.vimeoPlayer.play().then(function() {
    // the video was played
    }).catch(function(error) {
        switch (error.name) {
            case 'PasswordError':
                // the video is password-protected and the viewer needs to enter the
                // password first
                break;

            case 'PrivacyError':
                // the video is private
                break;

            default:
                // some other error occurred
                break;
        }
    });
  }  
  loadVideo(vid){
    
    

       this.vimeoPlayer.loadVideo(vid.video_id).then(function(id) {
    // the video successfully loaded
    
        //self.playVideo();
       // yeld();

      }) .catch(function(error) {
         
           console.log(error)
        /*  switch (error.name) {
              case 'TypeError':
                  // the id was not a number
                  break;

              case 'PasswordError':
                  // the video is password-protected and the viewer needs to enter the
                  // password first
                  break;

              case 'PrivacyError':
                  // the video is password-protected or private
                  break;

              default:
                  // some other error occurred
                  break;
          }*/
      });


  }

   selectedVideo(vid){
      
     this.inplay = vid;
     this.loadVideo(vid);
     
   }

  

}
