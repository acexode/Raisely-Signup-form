import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  isEmailRegisterd(email: string) {
    let userObj = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: {
        email: email
      }
    };
    return this.http.post("https://api.raisely.com/v3/check-user", userObj);
  }

  signup(user) {
    let newUser = {
      campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
      data: user
    };
    console.log(newUser);
    return this.http.post("https://api.raisely.com/v3/check-user", newUser);
  }
}
