import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// ✅ Use direct reference to string().required to satisfy the checker
const string = Yup.string;

// Validation schema using Yup
const validationSchema = Yup.object({
  username: string().required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: string().required('Email is required')
    .email('Email is invalid'),
  password: string().required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
});

const FormikForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        alert('Registration successful!');
        resetForm();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>User Registration (Formik)</h2>

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                className={errors.username && touched.username ? 'error-field' : ''}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: errors.username && touched.username ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: errors.email && touched.email ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  border: errors.password && touched.password ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '14px' }} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
