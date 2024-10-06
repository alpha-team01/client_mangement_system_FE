function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_LANDING = '/';
const ROOTS_HOME = '/home';
const ROOTS_TEST = '/test';
const ROOTS_DASHBOARD = '/dashboards';
const ROOTS_LAYOUT = '/layouts';
const ROOTS_PROFILE = '/user-profile';
const ROOTS_SOCIAL = '/social';
const ROOTS_BLOG = '/blog';
const ROOTS_CAREERS = '/careers';
const ROOTS_ACCOUNT = '/account';
const ROOTS_AUTH = '/auth';
const ROOTS_PROJECTS = '/projects';
const ROOTS_CONTACTS = '/contacts';
const ROOTS_USER_MGMT = '/user-management';
const ROOTS_SUBSCRIPTION = '/subscription';
const ROOTS_INVOICE = '/invoice';
const ROOTS_FILE_MGMT = '/file-manager';
const ROOTS_INBOX = '/inbox';
const ROOTS_CALENDAR = '/calendar';
const ROOTS_ERRORS = '/errors';
const ROOTS_ABOUT = '/about';

const ROOTS_ADMIN = '/admin';
const ROOTS_SUPER_ADMIN = '/super-admin';
const ROOTS_DATA_ENTRY = '/data-entry';

export const PATH_LANDING = {
  root: ROOTS_LANDING,
  why: '/why-us',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
};

export const PATH_HOME = {
  root: ROOTS_HOME
};
export const PATH_TEST = {
  root: ROOTS_TEST
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  projects: path(ROOTS_DASHBOARD, '/projects'),
  ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
  marketing: path(ROOTS_DASHBOARD, '/marketing'),
  social: path(ROOTS_DASHBOARD, '/social'),
  bidding: path(ROOTS_DASHBOARD, '/bidding'),
  learning: path(ROOTS_DASHBOARD, '/learning'),
  logistics: path(ROOTS_DASHBOARD, '/logistics'),
};


export const PATH_LAYOUT = {
  root: ROOTS_LAYOUT,
  sidebar: {
    light: path(ROOTS_LAYOUT, '/sidebar/light'),
    dark: path(ROOTS_LAYOUT, '/sidebar/dark'),
    minimized: path(ROOTS_LAYOUT, '/sidebar/minimized'),
  },
  header: {
    light: path(ROOTS_LAYOUT, '/header/light'),
    dark: path(ROOTS_LAYOUT, '/header/dark'),
    overlay: path(ROOTS_LAYOUT, '/header/overlay'),
  },
};


export const PATH_USER_PROFILE = {
  details: path(ROOTS_PROFILE, '/details'),
  security: path(ROOTS_PROFILE, '/security'),
};

export const PATH_SOCIAL = {
  root: ROOTS_SOCIAL,
  feed: path(ROOTS_SOCIAL, '/feed'),
  activity: path(ROOTS_SOCIAL, '/activity'),
  followers: path(ROOTS_SOCIAL, '/followers'),
  settings: path(ROOTS_SOCIAL, '/settings'),
};

export const PATH_BLOG = {
  root: ROOTS_BLOG,
  details: (id: string | number): string => path(ROOTS_BLOG, `/view/${id}`),
};

export const PATH_CAREERS = {
  root: ROOTS_CAREERS,
  new: path(ROOTS_CAREERS, `/new`),
};

export const PATH_ACCOUNT = {
  root: ROOTS_ACCOUNT,
  settings: path(ROOTS_ACCOUNT, '/settings'),
  security: path(ROOTS_ACCOUNT, '/security'),
  activity: path(ROOTS_ACCOUNT, '/activity'),
  billing: path(ROOTS_ACCOUNT, '/billing'),
  statements: path(ROOTS_ACCOUNT, '/statements'),
  referral: path(ROOTS_ACCOUNT, '/referral'),
  api: path(ROOTS_ACCOUNT, '/api-keys'),
  logs: path(ROOTS_ACCOUNT, '/logs'),
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  signin: path(ROOTS_AUTH, '/signin'),
  signup: path(ROOTS_AUTH, '/signup'),
  passwordReset: path(ROOTS_AUTH, '/password-reset'),
  passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
  welcome: path(ROOTS_AUTH, '/welcome'),
  verifyEmail: path(ROOTS_AUTH, '/verify-email'),
  accountDelete: path(ROOTS_AUTH, '/account-delete'),
};

export const PATH_ERROR = {
  root: ROOTS_ERRORS,
  error400: path(ROOTS_ERRORS, '/400'),
  error403: path(ROOTS_ERRORS, '/403'),
  error404: path(ROOTS_ERRORS, '/404'),
  error500: path(ROOTS_ERRORS, '/500'),
  error503: path(ROOTS_ERRORS, '/503'),
};

export const PATH_PROJECTS = {
  root: ROOTS_PROJECTS,
  details: (id: string | number): string => path(ROOTS_PROJECTS, `/view/${id}`),
};

export const PATH_CONTACTS = {
  root: ROOTS_CONTACTS,
  details: (id: string | number): string => path(ROOTS_CONTACTS, `/view/${id}`),
  new: path(ROOTS_CONTACTS, '/new'),
  editDetails: (id: string | number): string =>
    path(ROOTS_CONTACTS, `/edit/${id}`),
};

export const PATH_USER_MGMT = {
  root: ROOTS_USER_MGMT,
  users: {
    all: path(ROOTS_USER_MGMT, '/users'),
    details: (id: string | number): string =>
      path(ROOTS_USER_MGMT, `/view/${id}`),
  },
  roles: {
    all: path(ROOTS_USER_MGMT, '/roles'),
    details: (id: string | number): string =>
      path(ROOTS_USER_MGMT, `/roles/view/${id}`),
  },
  permissions: path(ROOTS_USER_MGMT, '/permissions'),
};

export const PATH_SUBSCRIPTION = {
  root: ROOTS_SUBSCRIPTION,
  list: path(ROOTS_SUBSCRIPTION, `/list`),
  new: path(ROOTS_SUBSCRIPTION, `/new`),
  details: (id: string | number): string =>
    path(ROOTS_SUBSCRIPTION, `/view/${id}`),
};

export const PATH_START = {
  root: 'https://mantine-analytics-dashboard-docs.netlify.app/getting-started',
};

export const PATH_DOCS = {
  help: 'https://github.com/design-sparx/antd-multipurpose-dashboard/blob/main/README.md',
  components: 'https://6546507b657a74164abf2db6-oniqlpqtfs.chromatic.com/',
  productRoadmap:
    'https://kelvink96.notion.site/1af2c000eb4f4b1688684cb2d88d5ee4?v=eb14f3050b7d4357821dbcb4bb61b636&p=752cacbf390f4d1cbc0e625550391d9b&pm=s',
};

export const PATH_CHANGELOG = {
  root: '',
};

export const PATH_GITHUB = {
  org: 'https://github.com/design-sparx',
  personal: 'https://github.com/kelvink96',
  repo: 'https://github.com/design-sparx/antd-multipurpose-dashboard',
};

export const PATH_SOCIALS = {
  behance: 'https://www.behance.net/kelvink96',
  dribbble: 'https://dribbble.com/kelvink96',
  facebook: 'https://www.facebook.com/kelvinkk96',
  instagram: 'https://www.instagram.com/kelvink_96/',
  linkedin: 'https://www.linkedin.com/in/kelvink96/',
  youtube: 'https://twitter.com/kelvink_96',
};

export const PATH_ABOUT = {
  root: ROOTS_ABOUT,
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  index: path(ROOTS_ADMIN, '/index'),
  users: path(ROOTS_ADMIN, '/users'),
  roles: path(ROOTS_ADMIN, '/roles'),
  permissions: path(ROOTS_ADMIN, '/permissions'),
};

export const PATH_SUPER_ADMIN = {
  root: ROOTS_SUPER_ADMIN,
  index: path(ROOTS_SUPER_ADMIN, '/index'),
  users: path(ROOTS_SUPER_ADMIN, '/users'),
  roles: path(ROOTS_SUPER_ADMIN, '/roles'),
  permissions: path(ROOTS_SUPER_ADMIN, '/permissions'),
};

export const PATH_DATA_ENTRY = {
  root: ROOTS_DATA_ENTRY,
  dashbord: path(ROOTS_DATA_ENTRY, '/dashboard'),
  users: path(ROOTS_DATA_ENTRY, '/users'),
  roles: path(ROOTS_DATA_ENTRY, '/roles'),
  permissions: path(ROOTS_DATA_ENTRY, '/permissions'),
};
