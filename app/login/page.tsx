"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../services/apiService';
import { useRouter } from 'next/navigation';
import { msgError } from '../utils/swal';
import axiosInstance from '../plugin/axiosInstance';

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues = {
    username: '',
    password: '',
  };
  
  const validationSchema = Yup.object({
    username: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });
  
  const LoginPage = () => {
    const router = useRouter();

    return (
    
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const data = await loginUser(values.username, values.password);
                if (data.token) {
                  localStorage.setItem("token", data.token);
                  axiosInstance.defaults.headers.Authorization = `${data.token}`;
                    router.push('/');
                  }
              } catch (error: any) {
                const { message } = error.response.data
                msgError(message)
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="username"
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full max-w-xs px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
        
      
    );
  };
  
  export default LoginPage;