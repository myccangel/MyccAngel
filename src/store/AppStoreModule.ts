import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducers";
import { loginReducer } from "./login/login.reducers";
import { LoginEffects } from "./login/login.effects";
import { EffectsModule } from "@ngrx/effects";
import { registerReducer } from "./register/register.reducers";
import { RegisterEffects } from "./register/register.effects";



export const AppStoreModule=[
  StoreModule.forRoot([]),
  StoreModule.forFeature("loading", loadingReducer),
  StoreModule.forFeature("login", loginReducer),
  StoreModule.forFeature("register", registerReducer),
  StoreModule.forRoot({ login: loginReducer }),
  EffectsModule.forRoot([]),
  EffectsModule.forRoot([
    LoginEffects,
    RegisterEffects

  ])

]
