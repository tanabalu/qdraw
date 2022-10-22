import { RouteConfig } from 'react-router-config'
import Home from '@/pages/Home';

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
]

export default routesConfig;
