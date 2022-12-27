import SvgColor from '../../../components/svg-color';
import { PATH_DASHBOARD } from '../../../routes/paths';


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
  staffIocn: icon('ic_staff'),
  bannerIocn: icon('ic_banner'),
  postsIocn: icon('ic_posts'),
  contacticon: icon('ic_contacticon'),
  dealerIocn: icon('ic_dealerIocn'),
  brandIocn: icon('ic_brandIocn'),
  cityIcon: icon('ic_cityIcon'),
  resaleIocn: icon('ic_resaleIocn'),
  laptopIcon: icon('ic_laptopIcon'),
  mobileIcon: icon('ic_mobileIcon'),
  coponIocn: icon('ic_coponIocn'),
  customerIocn: icon('ic_customerIocn'),
  laptoprepairIocn: icon('ic_laptoprepairIocn'),
  pcrepairIocn: icon('ic_pcrepairIocn'),
  mobilerepairIocn: icon('ic_mobilerepairIocn'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [


  {
    subheader: 'Managment',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: "Staff", path: PATH_DASHBOARD.staff.view, icon: ICONS.staffIocn },
      { title: 'Customer Management ', path: PATH_DASHBOARD.customer.view, icon: ICONS.customerIocn },
      { title: 'Coupons', path: PATH_DASHBOARD.coupons.view, icon: ICONS.coponIocn },
    ],
  },

  {
    subheader: 'Service Managment',
    items: [
      { title: 'Mobiler Repair', path: PATH_DASHBOARD.mobilerepair.view, icon: ICONS.mobilerepairIocn },
      { title: 'Laptop Repair', path: PATH_DASHBOARD.laptoprepair.view, icon: ICONS.laptoprepairIocn },
      { title: 'PC Repair', path: PATH_DASHBOARD.pcrepair.view, icon: ICONS.pcrepairIocn },
      { title: 'Resale Request', path: PATH_DASHBOARD.resalerequest.view, icon: ICONS.resaleIocn },
    ],
  },

  {
    subheader: 'COMMUNICATIONS',
    items: [
      { title: 'Dealer Enquiry', path: PATH_DASHBOARD.dealer.view, icon: ICONS.dealerIocn },
      { title: "Contact Enquiry", path: PATH_DASHBOARD.contact.view, icon: ICONS.contacticon },
      { title: "Testimonial", path: PATH_DASHBOARD.testimonials.view, icon: ICONS.dashboard },
      { title: 'Blog And Updates', path: PATH_DASHBOARD.blogmanagement.view, icon: ICONS.blog },
    ],
  },

  {
    subheader: 'CONFIGURATION',
    items: [
      { title: "City Management", path: PATH_DASHBOARD.city.view, icon: ICONS.cityIcon },
      { title: "laptop Brand", path: PATH_DASHBOARD.laptopbrand.view, icon: ICONS.laptopIcon },
      { title: 'Mobile Brand', path: PATH_DASHBOARD.mobilebrand.view, icon: ICONS.mobileIcon },
      { title: 'Banner', path: PATH_DASHBOARD.banner.view, icon: ICONS.bannerIocn },
      { title: 'Notification', path: PATH_DASHBOARD.notification.view, icon: ICONS.postsIocn },
    ],
  },

];

export default navConfig;
