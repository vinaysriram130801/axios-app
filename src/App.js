import logo from './logo.svg';
import './App.css';
import CrudOperation from './CRUD/crudOperation';
import { Component } from 'react';
import Component1 from './Context/myComponent';
import YouComponent from './Context/yourContext';
import CrudEmp1 from './axios/CrudEmp';


function App() {
  return (
    <div>
{/* <CrudOperation/> */}
    {/* <Component1/>
    <YouComponent/> */}
    <CrudEmp1/>
    </div>
  
  );
}

export default App;
