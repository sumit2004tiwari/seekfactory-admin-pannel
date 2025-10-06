// import { yupResolver } from '@hookform/resolvers/yup'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import * as yup from 'yup'

// import { useAdminAuth } from '@/context/admin/AuthContext' // Admin context
// import { useNotificationContext } from '@/context/useNotificationContext'
// import httpClient from '@/helpers/httpClient'

// const useSignIn = () => {
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()

//   const { fetchProfile } = useAdminAuth() // fetch profile after login
//   const { showNotification } = useNotificationContext()

//   const loginFormSchema = yup.object({
//     email: yup.string().email('Please enter a valid email').required('Please enter your email'),
//     password: yup.string().required('Please enter your password'),
//   })

//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(loginFormSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   type LoginFormFields = yup.InferType<typeof loginFormSchema>

//   const redirectUser = () => {
//     const redirectLink = searchParams.get('redirectTo')
//     if (redirectLink) navigate(redirectLink)
//     else navigate('/dashboard') // default dashboard
//   }

//   const login = handleSubmit(async (values: LoginFormFields) => {
//     setLoading(true)
//     try {
//       // Login request (cookies will be set by backend)
//       const res = await httpClient.post('/auth/admin/login', values, { withCredentials: true })

//       if (res.data.success) {
//         // Fetch profile after successful login
//         await fetchProfile()

//         // Redirect
//         redirectUser()

//         showNotification({ message: res.data.message, variant: 'success' })
//       } else {
//         showNotification({ message: res.data.message || 'Login failed', variant: 'danger' })
//       }
//     } catch (e: any) {
//       showNotification({ message: e.response?.data?.message || 'Login failed', variant: 'danger' })
//     } finally {
//       setLoading(false)
//     }
//   })

//   return { loading, login, control }
// }

// export default useSignIn
