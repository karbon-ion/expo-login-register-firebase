import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser, UserRole } from '../../services/authService';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  restaurantName: Yup.string()
    .when('userType', {
      is: 'restaurant',
      then: (schema) => schema.required('Restaurant name is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default function RegisterScreen() {

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-gray-50"
    >
      <ScrollView className="flex-1 px-6 pt-10">
        <Formik
          initialValues={{
            userType: 'user',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            restaurantName: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const userRole: UserRole = values.userType === 'restaurant' ? 'restaurant_admin' : 'user';
              await registerUser(values, userRole);
              // Navigate to login screen after successful registration
              router.navigate('/');
            } catch (error: any) {
              setStatus(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, status, isSubmitting }) => (
            <View className="bg-white p-8 rounded-3xl shadow-lg space-y-8 mb-8">
              <View className="space-y-2">
                <Text className="text-4xl font-bold text-center text-gray-800">Join Us</Text>
                <Text className="text-center text-gray-500 text-lg">Create your account</Text>
              </View>

              <View className="flex-row justify-center space-x-3 px-8">
                <TouchableOpacity
                  onPress={() => setFieldValue('userType', 'user')}
                  className={`flex-1 py-3 rounded-xl shadow ${
                    values.userType === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gray-100'
                  }`}
                >
                  <Text className={`text-center font-semibold text-sm ${
                    values.userType === 'user' ? 'text-white' : 'text-gray-600'
                  }`}>User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setFieldValue('userType', 'restaurant')}
                  className={`flex-1 py-3 rounded-xl shadow ${
                    values.userType === 'restaurant' 
                      ? 'bg-blue-600' 
                      : 'bg-gray-100'
                  }`}
                >
                  <Text className={`text-center font-semibold text-sm ${
                    values.userType === 'restaurant' ? 'text-white' : 'text-gray-600'
                  }`}>Restaurant Admin</Text>
                </TouchableOpacity>
              </View>

              <View className="space-y-6">
                <View className="space-y-2">
                  <Text className="text-gray-700 font-medium text-base">Full Name</Text>
                  <TextInput
                    className={`p-4 bg-gray-50 rounded-xl ${
                      errors.name && touched.name 
                        ? 'border-2 border-red-500' 
                        : touched.name 
                          ? 'border-2 border-green-500' 
                          : 'border border-gray-200'
                    }`}
                    placeholder="Enter your full name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {errors.name && touched.name && (
                    <Text className="text-red-500 text-sm">{errors.name}</Text>
                  )}
                </View>

                {values.userType === 'restaurant' && (
                  <View className="space-y-2">
                    <Text className="text-gray-700 font-medium text-base">Restaurant Name</Text>
                    <TextInput
                      className={`p-4 bg-gray-50 rounded-xl ${
                        errors.restaurantName && touched.restaurantName 
                          ? 'border-2 border-red-500' 
                          : touched.restaurantName 
                            ? 'border-2 border-green-500' 
                            : 'border border-gray-200'
                      }`}
                      placeholder="Enter restaurant name"
                      value={values.restaurantName}
                      onChangeText={handleChange('restaurantName')}
                      onBlur={handleBlur('restaurantName')}
                    />
                    {errors.restaurantName && touched.restaurantName && (
                      <Text className="text-red-500 text-sm">{errors.restaurantName}</Text>
                    )}
                  </View>
                )}

                <View className="space-y-2">
                  <Text className="text-gray-700 font-medium text-base">Email</Text>
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
                    <Text className="text-red-500 text-sm">{errors.email}</Text>
                  )}
                </View>

                <View className="space-y-2">
                  <Text className="text-gray-700 font-medium text-base">Password</Text>
                  <TextInput
                    className={`p-4 bg-gray-50 rounded-xl ${
                      errors.password && touched.password 
                        ? 'border-2 border-red-500' 
                        : touched.password 
                          ? 'border-2 border-green-500' 
                          : 'border border-gray-200'
                    }`}
                    placeholder="Create a password"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  {errors.password && touched.password && (
                    <Text className="text-red-500 text-sm">{errors.password}</Text>
                  )}
                </View>

                <View className="space-y-2">
                  <Text className="text-gray-700 font-medium text-base">Confirm Password</Text>
                  <TextInput
                    className={`p-4 bg-gray-50 rounded-xl ${
                      errors.confirmPassword && touched.confirmPassword 
                        ? 'border-2 border-red-500' 
                        : touched.confirmPassword 
                          ? 'border-2 border-green-500' 
                          : 'border border-gray-200'
                    }`}
                    placeholder="Confirm your password"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text className="text-red-500 text-sm">{errors.confirmPassword}</Text>
                  )}
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
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center items-center space-x-1 pt-4">
                <Text className="text-gray-600">Already have an account?</Text>
                <Link href="/" className="text-blue-600 font-semibold">
                  Sign In
                </Link>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
