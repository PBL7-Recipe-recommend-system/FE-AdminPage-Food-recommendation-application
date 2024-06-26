import NotFound from '@/pages/not-found';
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useRoutes } from 'react-router-dom';
const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const AccountsPage = lazy(() => import('@/pages/accounts'));
const AccountDetailPage = lazy(
  () => import('@/pages/accounts/AccountDetailPage')
);
const RecipePage = lazy(() => import('@/pages/recipes'));

const RecipeDetailPage = lazy(
  () => import('@/pages/recipes/RecipeDetailPage')
);

export default function AppRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, [navigate]);
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'account',
          element: <AccountsPage />
        },
        {
          path: 'account/details/:userId',
          element: <AccountDetailPage />
        },
        {
          path: 'recipe',
          element: <RecipePage />
        },
        {
          path: 'recipe/details/:recipeId',
          element: <RecipeDetailPage />
        },
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
