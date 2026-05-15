import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GithubUserData } from '../../model/github/githubUserData';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.github.com/users';

  getUserData(username: string){
    return this.http.get<GithubUserData>(this.apiUrl+'/'+username);
  }

}
