import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const formData = new FormData()

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState({})

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const validation = (e) => {

    const msg = {}

    if (username === '') {
      msg.username = 'Username is requied!'
    } else if (username.length < 4) {
      msg.username = 'Username should be at least 4 charcters long'
    }
    if (password === '') {
      msg.password = 'Password is requied!'
    }
    if (confirmPassword === '') {
      msg.confirmPassword = 'Password is requied!'
    } else if (password !== confirmPassword) {
      msg.confirmPassword = 'Password does not match!'
    }

    setError(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }

  const handleKeyUp =(e)=>{
    validation();
  }

  const handleSubmit = async (e) => {
    const isValid = validation()

    if (isValid) {
      formData.append('adminID', username)
      formData.append('adminPW', password)
      formData.append('password_confirmation', confirmPassword)

      await axios({
        method: 'Post',
        url: `${process.env.REACT_APP_URL_API}/api/auth/register`,
        data: formData,
        headers: { 'Content-Type': 'application/json' },
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (err) {
          console.log(err)
        })

      toast('Register success!')
      navigate('/login')
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="adminID"
                      defaultValue={username}
                      onChange={onChangeUsername}
                      onKeyUp={handleKeyUp}
                    />
                  </CInputGroup>

                  {error.username && <p className='text-danger'>{error.username}</p>}
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="adminPW"
                      defaultValue={password}
                      onChange={onChangePassword}
                      onKeyUp={handleKeyUp}
                    />
                  </CInputGroup>

                  {error.password && <p className='text-danger'>{error.password}</p>}

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="password_confirmation"
                      defaultValue={confirmPassword}
                      onChange={onChangeConfirmPassword}
                      onKeyUp={handleKeyUp}
                    />
                  </CInputGroup>

                  {error.confirmPassword && <p className='text-danger'>{error.confirmPassword}</p>}

                  <div className="d-grid">
                    <CButton onClick={handleSubmit} color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
