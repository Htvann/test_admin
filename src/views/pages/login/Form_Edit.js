import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  // ToastContainer,
  toast,
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Form_Edit = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    {/* <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p> */}
                    <CForm className="row g-3">
                      <CCol md={6}>
                        <CFormInput type="email" id="inputEmail4" label="Email" />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput type="password" id="inputPassword4" label="Password" />
                      </CCol>
                      <CCol xs={12}>
                        <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St" />
                      </CCol>
                      <CCol xs={12}>
                        <CFormInput
                          id="inputAddress2"
                          label="Address 2"
                          placeholder="Apartment, studio, or floor"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput id="inputCity" label="City" />
                      </CCol>
                      <CCol md={4}>
                        <CFormSelect id="inputState" label="State">
                          <option>Choose...</option>
                          <option>...</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={2}>
                        <CFormInput id="inputZip" label="Zip" />
                      </CCol>
                      <CCol xs={12}>
                        <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
                      </CCol>
                      <CCol xs={12}>
                        <CButton type="submit">Sign in</CButton>
                      </CCol>
                    </CForm>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Form_Edit
