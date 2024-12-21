import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../services/authService';
import { useAppContext } from '~/hooks/context';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function LoginScreen() {

  const {setUser} = useAppContext()

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <View className="flex-1 justify-center px-6">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const { role, error, ...user } = await loginUser(values.email, values.password);
              // Navigate based on user role
              if (role) {
                setUser({...user, role})
                router.replace(role === 'user' ? '/(user)/home':'/(admin)/dashboard');
              }
              setStatus(error)
            } catch (error: any) {
              setStatus(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, status }) => (
            <View className="bg-white p-8 rounded-3xl shadow-lg space-y-8">
              <View className="space-y-2">
                <Text className="text-4xl font-bold text-center text-gray-800">Welcome</Text>
                <Text className="text-center text-gray-500 text-lg">Sign in to your account</Text>
              </View>
              <View className="space-y-6">
                <View className="space-y-2">
                  <Text className="text-gray-700 font-medium text-base">Email</Text>
                  <View className="relative">
                    <TextInput
                      className={`p-4 bg-gray-50 rounded-xl ${
                        errors.email && touched.email 
                          ? 'border-2 border-red-500' 
                          : touched.email 
                            ? 'border-2 border-green-500' 
                            : 'border border-gray-200'
                      }`}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    {errors.email && touched.email && (
                      <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                    )}
                  </View>
                </View>

                <View className="space-y-2">
                  <Text className="text-gray-700 font-medium text-base">Password</Text>
                  <View className="relative">
                    <TextInput
                      className={`p-4 bg-gray-50 rounded-xl ${
                        errors.password && touched.password 
                          ? 'border-2 border-red-500' 
                          : touched.password 
                            ? 'border-2 border-green-500' 
                            : 'border border-gray-200'
                      }`}
                      placeholder="Enter your password"
                      secureTextEntry
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    {errors.password && touched.password && (
                      <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                    )}
                  </View>
                </View>
              </View>

              {status && (
                <Text className="text-red-500 text-center text-sm">{status}</Text>
              )}

              <View className="pt-4">
                <TouchableOpacity
                  className={`py-4 rounded-xl shadow ${
                    isSubmitting 
                      ? 'bg-blue-300' 
                      : 'bg-blue-600 active:bg-blue-700'
                  }`}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text className="text-white text-center font-semibold text-lg">
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center items-center space-x-1 pt-4">
                <Text className="text-gray-600">Don't have an account?</Text>
                <Link href="/register" className="text-blue-600 font-semibold">
                  Sign Up
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}
