import { Navigate, Route, Routes, type RouteProps } from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'
import { useAdminAuth } from '@/context/admin/AuthContext'  // ✅ use the hook
import { appRoutes, authRoutes } from '@/routes/index'
import AdminLayout from '@/layouts/AdminLayout'

const AppRouter = (props: RouteProps) => {
  const { admin, loading } = useAdminAuth()  // ✅ get admin from context

  return (
    <Routes>
      {(authRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={<AuthLayout {...props}>{route.element}</AuthLayout>}
        />
      ))}

      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            !loading && admin ? (  // ✅ check auth properly
              <AdminLayout {...props}>{route.element}</AdminLayout>
            ) : (
              <Navigate
                to={`/auth/sign-in?redirectTo=${route.path}`}
                replace
              />
            )
          }
        />
      ))}
    </Routes>
  )
}

export default AppRouter
