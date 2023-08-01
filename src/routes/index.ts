import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';
const publicPath = '/PWA-Promotion'
const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: publicPath + '/',
    title: 'Welcome',
    icon: HomeIcon,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: publicPath + '/page-1',
    title: 'Page 1',
    icon: GitHubIcon,
  },
  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: publicPath + '/page-2',
    title: 'Page 2',
    icon: AddTaskIcon,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: publicPath + '/page-3',
    title: 'Page 3',
    icon: TerrainIcon,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: publicPath + '/page-4',
    title: 'Page 4',
    icon: BugReportIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: publicPath + '*',
  },
};

export default routes;
