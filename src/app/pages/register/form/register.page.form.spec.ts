import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('RegisterPageForm', () => {

  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

  beforeEach(() => {
    registerPageForm = new RegisterPageForm(new FormBuilder());
    form = registerPageForm.getForm();
  });

  it('It should empty first name be invalid', () => {
    expect(form.get('firstName')?.valid).toBeFalsy();
  });

  it('It should empty last name be invalid', () => {
    expect(form.get('lastName')?.valid).toBeFalsy();
  });
  it('It should empty contact number be invalid', () => {
    expect(form.get('contactNumber')?.valid).toBeFalsy();
  });
  it('It should empty email be invalid', () => {
    expect(form.get('email')?.valid).toBeFalsy();
  });
  it('It should empty password be invalid', () => {
    expect(form.get('password')?.valid).toBeFalsy();
  });
  it('It should empty day of birth be invalid', () => {
    expect(form.get('birthDate')?.valid).toBeFalsy();
  });
  it('It should address street be invalid', () => {
    expect(form.get('address')?.get('street')?.valid).toBeFalsy();
  });
  it('It should address number be invalid', () => {
    expect(form.get('address')?.get('number')?.valid).toBeFalsy();
  });
  it('It should address complement be invalid', () => {
    expect(form.get('address')?.get('complement')?.valid).toBeFalsy();
  });
  it('It should address city be invalid', () => {
    expect(form.get('address')?.get('city')?.valid).toBeFalsy();
  });
  it('It should address zip code be invalid', () => {
    expect(form.get('address')?.get('zipCode')?.valid).toBeFalsy();
  });
  it('It should address country be invalid', () => {
    expect(form.get('address')?.get('country')?.valid).toBeFalsy();
  });
  it('It should invalid email be invalid', () => {
    form.get('email')?.setValue('invalidEmail');
    expect(form.get('email')?.valid).toBeFalsy();
  });
  it('It should password less than 7 characters be invalid', () => {
    form.get('password')?.setValue('12345');
    expect(form.get('password')?.valid).toBeFalsy();
  });
  it('It should password different from repeat password be invalid', () => {
    form.get('password')?.setValue('anyPassword');
    form.get('repeatPassword')?.setValue('anotherPassword');
    expect(form.get('repeatPassword')?.valid).toBeFalsy();
  });

  it('It should form be valid', () => {
    form.get('firstName')?.setValue("anyFirstName");
    form.get('lastName')?.setValue("anyLastName");
    form.get('contactNumber')?.setValue("anyContactNumber");
    form.get('email')?.setValue("any@email.com");
    form.get('password')?.setValue("anyPassword");
    form.get('repeatPassword')?.setValue("anyPassword");
    form.get('address')?.get('street')?.setValue('anyStreet');
    form.get('address')?.get('number')?.setValue('anyNumber');
    form.get('address')?.get('complement')?.setValue('anyComplement');
    form.get('address')?.get('city')?.setValue('anyCity');
    form.get('address')?.get('zipCode')?.setValue('anyZipCode');
    form.get('address')?.get('country')?.setValue('anyCountry');
    expect(form.valid).toBeTruthy();
  });

});
