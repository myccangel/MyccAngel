
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
export class LoginPageForm{
  private formBuilder: FormBuilder;
  constructor(formBuilder: FormBuilder){
    this.formBuilder = formBuilder;
  }
  createForm(): FormGroup{
    return this.formBuilder.group({
      name: ['', [Validators.required]], // Add the name field here
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      repeatPassword: ['', [Validators.required]]
    });
  }
}
