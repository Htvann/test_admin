import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import axios from 'axios'
// routes config
import routes from '../routes'

const token = localStorage.getItem('token_key')
const getSignature = async () => {
  try {
    const result = await axios({
      method: `Get`,
      url: `${process.env.REACT_APP_URL_API}/api/auth/user-profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return result
  } catch (err) {
    console.log(err)
  }
}

const AppContent = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function ss() {
      const data = await getSignature()
      setData(data)
    }
    ss()
    // views / pages / login / Login
  }, [])
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
