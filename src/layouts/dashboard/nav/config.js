import { PATH_DASHBOARD } from '../../../routes/paths';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  staffIocn: icon('ic_staff'),
  bannerIocn: icon('ic_banner'),
  postsIocn: icon('ic_posts'),
  contacticon: icon('ic_contacticon'),
  dealerIocn: icon('ic_dealerIocn'),
  brandIocn: icon('ic_brandIocn'),
  cityIcon: icon('ic_cityIcon'),
};

const navConfig = [


  {
    subheader: 'Managment',
    items: [
      { title: "Staff", path: PATH_DASHBOARD.staff.view, icon: ICONS.staffIocn },
      { title: 'Banner', path: PATH_DASHBOARD.banner.view, icon: ICONS.bannerIocn },
      { title: 'Notification', path: PATH_DASHBOARD.notification.view, icon: ICONS.postsIocn },
    ],
  },

  {
    subheader: 'Enquiry',
    items: [
      { title: "Contact Enquiry", path: PATH_DASHBOARD.contact.view, icon: ICONS.contacticon },
      { title: 'Dealer Enquiry', path: PATH_DASHBOARD.dealer.view, icon: ICONS.dealerIocn },
    ],
  },

  {
    subheader: 'CONFIGURATION',
    items: [
      { title: "City Management", path: PATH_DASHBOARD.city.view, icon: ICONS.cityIcon },
      { title: 'Brand Management', path: PATH_DASHBOARD.brand.view, icon: ICONS.brandIocn },
      { title: 'Customer Management ', path: PATH_DASHBOARD.customer.view, icon: ICONS.customerIocn },
      { title: 'Coupons', path: PATH_DASHBOARD.coupons.view, icon: ICONS.customerIocn },
    ],
  },

];

export default navConfig;
