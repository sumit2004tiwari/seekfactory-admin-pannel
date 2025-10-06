import BlogEdit from '@/app/(admin)/pages/blog/pages/BlogEdit'
import BlogEditor from '@/app/(admin)/pages/blog/pages/BlogEditor'
import BlogList from '@/app/(admin)/pages/blog/pages/BlogList'
import BlogView from '@/app/(admin)/pages/blog/pages/BlogView'
import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'



const Analytics = lazy(() => import('@/app/(admin)/dashboard/analytics/page'))
const Chat = lazy(() => import('@/app/(admin)/apps/chat/page'))
const Todo = lazy(() => import('@/app/(admin)/apps/todo/page'))
const Invoices = lazy(() => import('@/app/(admin)/invoices/page'))
const InvoiceDetails = lazy(() => import('@/app/(admin)/invoices/[invoiceId]/page'))
const Contact = lazy(() => import('@/app/(admin)/apps/contact/page'))

// Pages Routes
const Welcome = lazy(() => import('@/app/(admin)/pages/welcome/page'))
const FAQs = lazy(() => import('@/app/(admin)/pages/faqs/page'))
const TimelinePage = lazy(() => import('@/app/(admin)/pages/timeline/page'))
const CategoryPage = lazy(() => import('@/app/(admin)/pages/category/page'))
// const Pricing = lazy(() => import('@/app/(admin)/pages/blog/pages/BlogList'))
const Widgets = lazy(() => import('@/app/(admin)/widgets/page'))

// Base UI Routes
const Accordions = lazy(() => import('@/app/(admin)/ui/accordions/page'))
const Alerts = lazy(() => import('@/app/(admin)/ui/alerts/page'))
const Avatars = lazy(() => import('@/app/(admin)/ui/avatars/page'))
const Badges = lazy(() => import('@/app/(admin)/ui/badges/page'))
const Breadcrumb = lazy(() => import('@/app/(admin)/ui/breadcrumb/page'))
const Buttons = lazy(() => import('@/app/(admin)/ui/buttons/page'))
const Cards = lazy(() => import('@/app/(admin)/ui/cards/page'))
const Carousel = lazy(() => import('@/app/(admin)/ui/carousel/page'))
const Collapse = lazy(() => import('@/app/(admin)/ui/collapse/page'))
const Dropdowns = lazy(() => import('@/app/(admin)/ui/dropdowns/page'))
const ListGroup = lazy(() => import('@/app/(admin)/ui/list-group/page'))
const Modals = lazy(() => import('@/app/(admin)/ui/modals/page'))
const Tabs = lazy(() => import('@/app/(admin)/ui/tabs/page'))
const Offcanvas = lazy(() => import('@/app/(admin)/ui/offcanvas/page'))
const Pagination = lazy(() => import('@/app/(admin)/ui/pagination/page'))
const Placeholders = lazy(() => import('@/app/(admin)/ui/placeholders/page'))
const Popovers = lazy(() => import('@/app/(admin)/ui/popovers/page'))
const Progress = lazy(() => import('@/app/(admin)/ui/progress/page'))
const Spinners = lazy(() => import('@/app/(admin)/ui/spinners/page'))
const Toasts = lazy(() => import('@/app/(admin)/ui/toasts/page'))
const Tooltips = lazy(() => import('@/app/(admin)/ui/tooltips/page'))

// Advanced UI Routes
const Ratings = lazy(() => import('@/app/(admin)/advanced/ratings/page'))
const SweetAlerts = lazy(() => import('@/app/(admin)/advanced/alert/page'))
const Swiper = lazy(() => import('@/app/(admin)/advanced/swiper/page'))
const Scrollbar = lazy(() => import('@/app/(admin)/advanced/scrollbar/page'))
const Toastify = lazy(() => import('@/app/(admin)/advanced/toastify/page'))

// Charts and Maps Routes
// const Area = lazy(() => import('@/app/(admin)/charts/area/page'))
const Bar = lazy(() => import('@/app/(admin)/charts/bar/page'))
// const Bubble = lazy(() => import('@/app/(admin)/charts/bubble/page'))
// const Candlestick = lazy(() => import('@/app/(admin)/charts/candlestick/page'))
// const Column = lazy(() => import('@/app/(admin)/charts/column/page'))
// const Heatmap = lazy(() => import('@/app/(admin)/charts/heatmap/page'))
// const Line = lazy(() => import('@/app/(admin)/charts/line/page'))
// const Mixed = lazy(() => import('@/app/(admin)/charts/mixed/page'))
// const Timeline = lazy(() => import('@/app/(admin)/charts/timeline/page'))
// const Boxplot = lazy(() => import('@/app/(admin)/charts/boxplot/page'))
// const Treemap = lazy(() => import('@/app/(admin)/charts/treemap/page'))
// const Pie = lazy(() => import('@/app/(admin)/charts/pie/page'))
// const Radar = lazy(() => import('@/app/(admin)/charts/radar/page'))
// const RadialBar = lazy(() => import('@/app/(admin)/charts/radial-bar/page'))
// const Scatter = lazy(() => import('@/app/(admin)/charts/scatter/page'))
// const Polar = lazy(() => import('@/app/(admin)/charts/polar/page'))
const GoogleMaps = lazy(() => import('@/app/(admin)/maps/google/page'))
const VectorMaps = lazy(() => import('@/app/(admin)/maps/vector/page'))

// Forms Routes
const Basic = lazy(() => import('@/app/(admin)/forms/basic/page'))
const Checkbox = lazy(() => import('@/app/(admin)/forms/checkbox/page'))
const Select = lazy(() => import('@/app/(admin)/forms/select/page'))
const Clipboard = lazy(() => import('@/app/(admin)/forms/clipboard/page'))
const FlatPicker = lazy(() => import('@/app/(admin)/forms/flat-picker/page'))
const Validation = lazy(() => import('@/app/(admin)/forms/validation/page'))
const Wizard = lazy(() => import('@/app/(admin)/forms/wizard/page'))
const FileUploads = lazy(() => import('@/app/(admin)/forms/file-uploads/page'))
const Editors = lazy(() => import('@/app/(admin)/forms/editors/page'))
const InputMask = lazy(() => import('@/app/(admin)/forms/input-mask/page'))
const Slider = lazy(() => import('@/app/(admin)/forms/slider/page'))

// Form Routes
const BasicTable = lazy(() => import('@/app/(admin)/tables/basic/page'))
const GridjsTable = lazy(() => import('@/app/(admin)/tables/gridjs/page'))

// Icon Routes
const BoxIcons = lazy(() => import('@/app/(admin)/icons/boxicons/page'))
const SolarIcons = lazy(() => import('@/app/(admin)/icons/iconamoon/page'))

// Not Found Routes
const NotFoundAdmin = lazy(() => import('@/app/(admin)/not-found'))
const NotFound = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'))

// Auth Routes
const AuthSignIn2 = lazy(() => import('@/app/(other)/auth/sign-in-2/page'))
const AuthSignUp2 = lazy(() => import('@/app/(other)/auth/sign-up-2/page'))
const ResetPassword2 = lazy(() => import('@/app/(other)/auth/reset-pass-2/page'))
const LockScreen2 = lazy(() => import('@/app/(other)/auth/lock-screen-2/page'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/dashboard/analytics" />,
  },
]

const generalRoutes: RoutesProps[] = [

  {
    path: '/dashboard/analytics',
    name: 'Analytics',
    element: <Analytics />,
  },
  //   {
  //     path: '/dashboard/finance',
  //     name: 'Finance',
  //     element: <Finance />,
  //   },
  //   {
  //     path: '/dashboard/sales',
  //     name: 'Sales',
  //     element: <Sales />,
  //   },
]

const appsRoutes: RoutesProps[] = [
  //   {
  //     name: 'Products',
  //     path: '/ecommerce/products',
  //     element: <EcommerceProducts />,
  //   },
  //   {
  //     name: 'Product Details',
  //     path: '/ecommerce/products/:productId',
  //     element: <EcommerceProductDetails />,
  //   },
  //   {
  //     name: 'Create Product',
  //     path: '/ecommerce/products/create',
  //     element: <EcommerceProductCreate />,
  //   },
  //   {
  //     name: 'Customers',
  //     path: '/ecommerce/customers',
  //     element: <EcommerceCustomers />,
  //   },
  //   {
  //     name: 'Sellers',
  //     path: '/ecommerce/sellers',
  //     element: <EcommerceSellers />,
  //   },
  //   {
  //     name: 'Orders',
  //     path: '/ecommerce/orders',
  //     element: <EcommerceOrders />,
  //   },
  //   {
  //     name: 'Order Details',
  //     path: '/ecommerce/orders/:orderId',
  //     element: <EcommerceOrderDetails />,
  //   },
  //   {
  //     name: 'Inventory',
  //     path: '/ecommerce/inventory',
  //     element: <EcommerceInventory />,
  //   },
  
   
   
      {
        name: 'BIS-Chat',
        path: '/apps/chat/bis', // note: relative path
        element: <Chat />,
      },
      {
        name: 'Vendor Chat',
        path: '/apps/chat/vendor', // note: relative path
        element: <Chat />,
      },
    
  
  {
    name: 'apps-contact',
    path: '/apps/contact',
    element: <Contact />,
  },
  // {
  //   name: 'Schedule',
  //   path: '/calendar/schedule',
  //   element: <Schedule />,
  // },
  // {
  //   name: 'Integration',
  //   path: '/calendar/integration',
  //   element: <Integration />,
  // },
  //   {

  {
    name: 'Todo',
    path: '/apps/todo',
    element: <Todo />,
  },
  //   {
  //     name: 'Social',
  //     path: '/apps/social',
  //     element: <Social />,
  //   },
  //   {
  //     name: 'Contacts',
  //     path: '/apps/contacts',
  //     element: <Contacts />,
  //   },
  {
    name: 'Invoices List',
    path: '/invoices',
    element: <Invoices />,
  },
  {
    name: 'Invoices Details',
    path: '/invoices/:supplierId',
    element: <InvoiceDetails />,
  },

]

const customRoutes: RoutesProps[] = [
  { name: 'Welcome', path: '/pages/welcome', element: <Welcome /> },
  { name: 'About Us', path: '/pages/aboutus', element: <FAQs /> },
  { name: 'Timeline', path: '/footer', element: <TimelinePage /> },
  { name: 'Blog-List', path: '/pages/blog', element: <BlogList /> },
  { name: 'New Blog', path: '/blog/new', element: <BlogEditor /> },
{ name: 'Blog View', path: '/blog/:id', element: <BlogView /> },
{ name: 'Blog Edit', path: '/blog/:id/edit', element: <BlogEdit /> },
  { name: 'Error 404 Alt', path: '/pages/error-404-alt', element: <NotFoundAdmin /> },
  { name: 'Widgets', path: '/widgets', element: <Widgets /> },
   { name: 'category', path: '/pages/category', element: <CategoryPage /> },
];



const baseUIRoutes: RoutesProps[] = [
  {
    name: 'Accordions',
    path: '/ui/accordions',
    element: <Accordions />,
  },
  {
    name: 'Alerts',
    path: '/ui/alerts',
    element: <Alerts />,
  },
  {
    name: 'Avatars',
    path: '/ui/avatars',
    element: <Avatars />,
  },
  {
    name: 'Badges',
    path: '/ui/badges',
    element: <Badges />,
  },
  {
    name: 'Breadcrumb',
    path: '/ui/breadcrumb',
    element: <Breadcrumb />,
  },
  {
    name: 'Buttons',
    path: '/ui/buttons',
    element: <Buttons />,
  },
  {
    name: 'Cards',
    path: '/ui/cards',
    element: <Cards />,
  },
  {
    name: 'Carousel',
    path: '/ui/carousel',
    element: <Carousel />,
  },
  {
    name: 'Collapse',
    path: '/ui/collapse',
    element: <Collapse />,
  },
  {
    name: 'Dropdowns',
    path: '/ui/dropdowns',
    element: <Dropdowns />,
  },
  {
    name: 'List Group',
    path: '/ui/list-group',
    element: <ListGroup />,
  },
  {
    name: 'Modals',
    path: '/ui/modals',
    element: <Modals />,
  },
  {
    name: 'Tabs',
    path: '/ui/tabs',
    element: <Tabs />,
  },
  {
    name: 'Offcanvas',
    path: '/ui/offcanvas',
    element: <Offcanvas />,
  },
  {
    name: 'Pagination',
    path: '/ui/pagination',
    element: <Pagination />,
  },
  {
    name: 'Placeholders',
    path: '/ui/placeholders',
    element: <Placeholders />,
  },
  {
    name: 'Popovers',
    path: '/ui/popovers',
    element: <Popovers />,
  },
  {
    name: 'Progress',
    path: '/ui/progress',
    element: <Progress />,
  },
  {
    name: 'Spinners',
    path: '/ui/spinners',
    element: <Spinners />,
  },
  {
    name: 'Toasts',
    path: '/ui/toasts',
    element: <Toasts />,
  },
  {
    name: 'Tooltips',
    path: '/ui/tooltips',
    element: <Tooltips />,
  },
]

const advancedUIRoutes: RoutesProps[] = [
  {
    name: 'Ratings',
    path: '/advanced/ratings',
    element: <Ratings />,
  },
  {
    name: 'Sweet Alert',
    path: '/advanced/alert',
    element: <SweetAlerts />,
  },
  {
    name: 'Swiper Slider',
    path: '/advanced/swiper',
    element: <Swiper />,
  },
  {
    name: 'Scrollbar',
    path: '/advanced/scrollbar',
    element: <Scrollbar />,
  },
  {
    name: 'Toastify',
    path: '/advanced/toastify',
    element: <Toastify />,
  },
]

const chartsNMapsRoutes: RoutesProps[] = [

  {
    name: 'Bar',
    path: '/charts/bar',
    element: <Bar />,
  },
  {
    name: 'Google',
    path: '/maps/google',
    element: <GoogleMaps />,
  },
  {
    name: 'Vector',
    path: '/maps/vector',
    element: <VectorMaps />,
  },
]

const formsRoutes: RoutesProps[] = [
  {
    name: 'Basic Elements',
    path: '/forms/basic',
    element: <Basic />,
  },
  {
    name: 'Checkbox & Radio',
    path: '/forms/checkbox',
    element: <Checkbox />,
  },
  {
    name: 'Choice Select',
    path: '/forms/select',
    element: <Select />,
  },
  {
    name: 'Clipboard',
    path: '/forms/clipboard',
    element: <Clipboard />,
  },
  {
    name: 'Flat Picker',
    path: '/forms/flat-picker',
    element: <FlatPicker />,
  },
  {
    name: 'Validation',
    path: '/forms/validation',
    element: <Validation />,
  },
  {
    name: 'Wizard',
    path: '/forms/wizard',
    element: <Wizard />,
  },
  {
    name: 'File Uploads',
    path: '/forms/file-uploads',
    element: <FileUploads />,
  },
  {
    name: 'Editors',
    path: '/forms/editors',
    element: <Editors />,
  },
  {
    name: 'Input Mask',
    path: '/forms/input-mask',
    element: <InputMask />,
  },
  {
    name: 'Slider',
    path: '/forms/slider',
    element: <Slider />,
  },
]

const tableRoutes: RoutesProps[] = [
  {
    name: 'Basic Tables',
    path: '/tables/basic',
    element: <BasicTable />,
  },
  {
    name: 'Grid JS',
    path: '/tables/gridjs',
    element: <GridjsTable />,
  },
]

const iconRoutes: RoutesProps[] = [
  {
    name: 'Boxicons',
    path: '/icons/boxicons',
    element: <BoxIcons />,
  },
  {
    name: 'SolarIcon',
    path: '/icons/solaricon',
    element: <SolarIcons />,
  },
]

export const authRoutes: RoutesProps[] = [
  {
    name: 'Sign In',
    path: '/auth/sign-in',
    element: <AuthSignIn2 />,
  },
  // {
  //   name: 'Sign Up',
  //   path: '/auth/sign-up',
  //   element: <AuthSignUp2 />,
  // },

  {
    name: 'Reset Password',
    path: '/auth/reset-pass',
    element: <ResetPassword2 />,
  },
  {
    name: 'Lock Screen',
    path: '/auth/lock-screen',
    element: <LockScreen2 />,
  },
  {
    name: '404 Error',
    path: '/error-404',
    element: <NotFound />,
  },
  {
    path: '*',
    name: 'not-found',
    element: <NotFound />,
  },

]

export const appRoutes = [
  ...initialRoutes,
  ...generalRoutes,
  ...appsRoutes,
  ...customRoutes,
  ...baseUIRoutes,
  ...advancedUIRoutes,
  ...chartsNMapsRoutes,
  ...formsRoutes,
  ...tableRoutes,
  ...iconRoutes,
  ...authRoutes,
]
