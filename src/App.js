import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Đà nẵng khám bệnh";
  }, []);
  return (
    <div className='max-w-full mx-auto' data-theme="wireframe">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>

  );
}

export default App;
