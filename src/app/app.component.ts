import { Component } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { UserService } from "./user.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.buildForm();
  }
  submitted = false;
  userCreated = false;
  buildForm(): void {
    this.form = this.fb.group({
      firstname: ["", [Validators.required, Validators.minLength(3)]],
      lastname: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        [Validators.required, Validators.pattern(this.emailPattern)],
        this.isEmailUnique.bind(this) // async Validator passed as 3rd parameter
      ],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }
  get f() {
    return this.form.controls;
  }
  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.userService.isEmailRegisterd(control.value).subscribe((e: any) => {
          console.log(e.data.status);
          if (e.data.status === "EXISTS") {
            resolve({ isEmailUnique: true });
          }
          resolve(null);
        });
      }, 1000);
    });
    return q;
  }

  onSubmit() {
    console.log(this.form.value);
    this.submitted = true;
    this.userService.signup(this.form.value).subscribe((e) => {
      console.log(e);
      this.submitted = false;
      this.userCreated = true;
      setTimeout(() => {
        this.userCreated = false;
      }, 5000);
      this.form.reset();
    });
  }
}
