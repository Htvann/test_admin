import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import DefaultLayout from './layout/DefaultLayout'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

const checkTokenUser = async () => {
  const token_user = localStorage.getItem('token_key')
  try {
    const result = await axios({
      method: `Get`,
      url: `${process.env.REACT_APP_URL_API}/api/auth/user-profile`,
      headers: {
        Authorization: `Bearer ${token_user}`,
      },
    })
    return result
  } catch (err) {
    console.log('err')
  }
}

export default function ProviderRoute() {
  const [dataUser, setDataUser] = useState({})
  useEffect(() => {
    async function checkData() {
      const tokenUser = await checkTokenUser()

      setDataUser(tokenUser)
      // toast.success('🦄 Wow so easy!', {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
    }
    checkData()
  }, [])

  if (dataUser !== null && dataUser !== undefined) {

    return <DefaultLayout />

  } else return <Navigate to="/login" />
}
