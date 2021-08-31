import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerRequests {
  profile;
  projects;
  experiences;
  identifiers;
  userid;
  loading = true;

  constructor(private http: HttpClient) {
  }

  getUserID(name) {
    return this.http
      .get('http://localhost:5000/api/GetUser/nameorid?name=' + name);
  }
  getProfile(id) {
    return this.http
      .get('http://localhost:5000/api/GetUser/nameorid?userid=' + id);
  }
  getProjects(userid) {
    return this.http
      .get('http://localhost:5000/api/GetProjects/' + userid);
  }
  getExperiences(userid) {
    return this.http
      .get('http://localhost:5000/api/GetExperiences/' + userid);
  }
  getIdentifiers(userid) {
    return this.http
      .get('http://localhost:5000/api/GetIdentifiers/' + userid);
  }
}
