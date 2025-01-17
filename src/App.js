import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UploadImage from './UploadImage';
import Editor from './Editor';
import ImageContextProvider from './store/image-context'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';


const router = createBrowserRouter([
  {path: '/', element: <UploadImage />},
  {path: '/editor', element: <Editor /> }
])

function App() {

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await axios.get('https://pixelart-backend-t6lh.onrender.com/ping');
        console.log('Backend is awake')
      }catch (error) {
        console.error('Error waking up the backend:', error);
      }
    }

    wakeUpServer();
  },[])

  return (
    <ImageContextProvider>
      <RouterProvider router={router}/>
      <ToastContainer />
    </ImageContextProvider>
    
  )
}

export default App;
