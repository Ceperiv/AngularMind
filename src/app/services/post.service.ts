import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IPost} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(urls.posts.url);
  };

  create(post:IPost):void{
    this.httpClient.post(urls.posts.url, post)
      .subscribe({next:() => console.log('done'), error: (e) => console.log(e)})
  }

  updateById(id: string, post: IPost):void{
    this.httpClient.put(urls.posts.url + '/' + id, post)
      .subscribe({next:() => console.log('done'), error: (e) => console.log(e)});
  };
}
