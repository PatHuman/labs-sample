import { Injectable } from '@angular/core';
import { Http,Response,Headers,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

@Injectable()
export class VimeoService {

  templates = {

  	embed:"https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/",
  	channel:""
  };	

  constructor(private http:Http) { }

  buildUrls(urls){

  	let list = [];

  	_.each(urls,(url)=>{

  		list.push(this.templates.embed+url)
  	})
console.log(list)
  	return list;
  }

  getVidoe(url){

  	return this.http.get(url)
      	.map((res:Response) => res.json());
  }

  buildPlaylist(urls){

  	let playlist = [];
  	let urList = this.buildUrls(urls);

  	for(let list of urList){

  		this.getVidoe(list).subscribe(vid =>  {
  			_.extend(vid,{video_url:"https://player.vimeo.com/videos/"+vid.video_id})
  			playlist.push(vid)

  			} );
  	}

  	return playlist;

  }

}
