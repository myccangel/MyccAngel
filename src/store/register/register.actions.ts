import { createAction, props } from "@ngrx/store";
import { UserRegister } from "src/app/model/user/UserRegister";

export const register = createAction('[Register] Register', props<{userRegister: UserRegister}>());
export const registerSuccess = createAction('[Register] Register Success');
export const registerFail = createAction('[Register] Register Fail', props<{error: any}>());
