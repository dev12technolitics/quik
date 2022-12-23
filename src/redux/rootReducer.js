import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import bannerReducer from './slices/banner';
import postsReducer from './slices/posts';
import departmentReducer from './slices/department';
import designationReducer from './slices/designation';

import staffReducer from './slices/staff';
import contactReducer from './slices/contact';
import dealerReducer from './slices/dealer';
import cityReducer from './slices/city';
import brandReducer from './slices/brand';
import customerReducer from './slices/customer';
import couponsReducer from './slices/coupons';
import laptopbrandReducer from './slices/laptopbrand';
import resalerequestReducer from './slices/resalerequest';
import testimonialReducer from './slices/testimonial';
import blogmanagementReducer from './slices/blogmanagement';
import pcrepairReducer from './slices/pcrepair';
import laptoprepairReducer from './slices/laptoprepair';
import mobilerepairReducer from './slices/mobilerepair';
// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  banner: bannerReducer,
  post: postsReducer,
  department: departmentReducer,
  designation: designationReducer,
  staff: staffReducer,
  contact: contactReducer,
  dealer:dealerReducer,
  city:cityReducer,
  brand:brandReducer,
  customer:customerReducer,
  coupons:couponsReducer,
  laptopbrand:laptopbrandReducer,
  resalerequest:resalerequestReducer,
  testimonial: testimonialReducer,
  blogmanagement: blogmanagementReducer,
  pcrepair: pcrepairReducer,
  laptoprepair: laptoprepairReducer,
  mobilerepair: mobilerepairReducer,
});

export { rootPersistConfig, rootReducer };
