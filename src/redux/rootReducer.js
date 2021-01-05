import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as language from "../app/modules/LanguagesProvider/_redux/languagesRedux";
import * as menu from "../app/modules/MenuProvider/_redux/menuRedux";
import * as serviceWorker from "../app/_redux/serviceWorkerRedux";


/*import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";*/

export const rootReducer = combineReducers({
  auth: auth.reducer,
  languages: language.reducer,
  menu: menu.reducer,
  serviceWorker: serviceWorker.reducer,
  /*customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer*/
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
