import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class RegisterPageForm {
  patchValue(arg0: { medicalReport: any; }) {
    throw new Error('Method not implemented.');
  }
  private formBuilder: FormBuilder;
  private form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      repeatPassword: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        country: ['', [Validators.required]]
      }),
      diagnosedYear: ['', [Validators.required]],
      typeIBDInformation: ['', [Validators.required]],
      impactInformation: ['', [Validators.required]],
      impactSleep: [false],
      impactPhysicalActivity: [false],
      impactSexualLife: [false],
      impactDietAndNutrition: [false],
      impactEmotionalConnection: [false],
      impactWorkAndSchool: [false],
      impactSocialActivities: [false],
      impactPhysicalHealth: [false],
      impactMentalHealth: [false],
      impactPersonalRelationship: [false],
      remission: [false],
      awaitingClinicalEvidence: [false],
      flareUpClinically: [false],
      veryMuchSymptomatic: [false],
      testBloodInStools: [false],
      testMucus: [false],
      testSharpAbdominalPain: [false],
      testFeverMoreOften: [false],
      testBloodInStoolsAgain: [false],
      testMucusAgain: [false],
      testSharpAbdominalPainAgain: [false],
      testFeverMoreOftenAgain: [false],
      acceptTerms: [false, [Validators.requiredTrue]],
      acceptDataAnalysis: [false, [Validators.requiredTrue]],
      acceptTermsAndPrivacy: [false, [Validators.requiredTrue]]
    });

    form.get('repeatPassword')?.setValidators(this.matchPasswordAndRepeatPassword(form));

    return form;
  }

  getForm(): FormGroup {
    return this.form;
  }

  private matchPasswordAndRepeatPassword(form: FormGroup): ValidatorFn {
    return () => {
      const password = form.get('password');
      const repeatPassword = form.get('repeatPassword');

      return password && repeatPassword && password.value === repeatPassword.value
        ? null
        : { isntMatching: true };
    };
  }
}
