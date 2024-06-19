import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('RegisterPageForm', ()=>{

  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

  beforeEach(()=>{
    registerPageForm = new RegisterPageForm(new FormBuilder());
    form = registerPageForm.getForm();

  })

  it(' It should empty name be invalid', ()=>{
    expect(form.get('name')?.valid).toBeFalsy();
  })
  it(' It should empty email be invalid', ()=>{
    expect(form.get('email')?.valid).toBeFalsy();
  })
  it(' It should empty phone be invalid', ()=>{
    expect(form.get('phone')?.valid).toBeFalsy();
  })
  it(' It should empty password be invalid', ()=>{
    expect(form.get('password')?.valid).toBeFalsy();
  })
  it(' It should address street be invalid', ()=>{
    expect(form.get('address')?.get('street')?.valid).toBeFalsy();
  })
  it(' It should address number be invalid', ()=>{
    expect(form.get('address')?.get('number')?.valid).toBeFalsy();
  })
  it(' It should address complement be invalid', ()=>{
    expect(form.get('address')?.get('complement')?.valid).toBeFalsy();
  })
  it(' It should address city be invalid', ()=>{
    expect(form.get('address')?.get('city')?.valid).toBeFalsy();
  })
  it(' It should address zipCode be invalid', ()=>{
    expect(form.get('address')?.get('zipCode')?.valid).toBeFalsy();
  })
  it(' It should address country be invalid', ()=>{
    expect(form.get('address')?.get('country')?.valid).toBeFalsy();
  })
  it(' It should invalid email be invalid', ()=>{
    form.get('email')?.setValue('invalidEmail');
    expect(form.get('email')?.valid).toBeFalsy();
  })
  it(' It should password less than 7 characters be invalid', ()=>{
    form.get('password')?.setValue('12345');
    expect(form.get('password')?.valid).toBeFalsy();
  })
  it(' It should password different from repeat password be invalid', ()=>{
    form.get('password')?.setValue('anyPassword');
    form.get('repeatPassword')?.setValue('anotherPassword');
    expect(form.get('repeatPassword')?.valid).toBeFalsy();
  })

  it('It should form be valid', () => {
    form.get('name')?.setValue("anyName");
    form.get('email')?.setValue("any@email.com");
    form.get('password')?.setValue("anyPassword");
    form.get('repeatPassword')?.setValue("anyPassword");
    form.get('phone')?.setValue("anyPhone");
    form.get('address')?.get('street')?.setValue('any Street');
    form.get('address')?.get('number')?.setValue('any number');
    form.get('address')?.get('complement')?.setValue('any complement');
    form.get('address')?.get('city')?.setValue('any city');
    form.get('address')?.get('zipCode')?.setValue('any zipCode');
    form.get('address')?.get('country')?.setValue('any country');
    expect(form.valid).toBeTruthy();

  })


})
