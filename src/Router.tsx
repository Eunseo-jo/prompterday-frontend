import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './component/Home';
import ResultPage from './component/Result';
import SelectConditionPage from './component/SelectCondition';
import SelectExpert from './component/SelectExpert';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'select',
        element: <SelectConditionPage />,
        children: [],
      },
      {
        path: 'select/option',
        element: <SelectExpert />,
      },
      {
        path: 'result',
        element: <ResultPage />,
      },
    ],
  },
]);

export default router;
