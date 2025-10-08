import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from '../components/formikForm';
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('controlled');

  return (
    <div className="App">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>React Form Handling Demo</h1>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setCurrentForm('controlled')}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              backgroundColor: currentForm === 'controlled' ? '#007bff' : '#f8f9fa',
              color: currentForm === 'controlled' ? 'white' : 'black',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Controlled Components
          </button>
          <button 
            onClick={() => setCurrentForm('formik')}
            style={{
              margin: '0 10px',
              padding: '10px 20px',
              backgroundColor: currentForm === 'formik' ? '#007bff' : '#f8f9fa',
              color: currentForm === 'formik' ? 'white' : 'black',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Formik
          </button>
        </div>
      </div>

      {currentForm === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}

export default App;