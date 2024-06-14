import { LoginPageForm } from './login.page.form';
import { FormBuilder, FormGroup } from '@angular/forms';
describe('LoginPageForm', () => {
  let loginPageform: LoginPageForm;
  let form: FormGroup;
  beforeEach(() => {
    loginPageform = new LoginPageForm(new FormBuilder());
    form = loginPageform.createForm();
  });
  it('Should create an empty login form', () => {
    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')?.value).toEqual("");
    expect(form.get('email')?.valid).toBeFalsy();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')?.value).toEqual("");
    expect(form.get('password')?.valid).toBeFalsy();
  });
  it('Should have an email invalid if email is not valid', () => {
    form.get('email')?.setValue('invalid email');
    expect(form.get('email')?.valid).toBeFalsy();
  });
  it('Should have an email valid if email is valid', () => {
    form.get('email')?.setValue('valid@email.com');
    expect(form.get('email')?.valid).toBeTruthy();
  });
  it('Should have a valid form', () => {
    form.get('email')?.setValue('valid@email.com');
    form.get('password')?.setValue('anypassword');
    expect(form.valid).toBeTruthy();
  });
});
