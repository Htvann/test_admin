import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  // CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
// import { DocsExample } from 'src/components'
// import { set } from 'core-js/core/dict'
import ReactPaginate from 'react-paginate'

import './style.css'

const token = localStorage.getItem('token_key')

let limit = 10

const getSignature = async () => {
  try {
    const result = await axios({
      method: `Get`,
      url: `${process.env.REACT_APP_URL_API}/api/user?page=1&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result
  } catch (err) {
    console.log('err')
  }
}
const editData = new FormData()
const Tables = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [pageNumber, setPageNumber] = useState()
  const [form, setForm] = useState(false)
  const [detail, setDetail] = useState(false)
  const [deleteForm, setDeleteForm] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [state, setState] = useState('')
  const [nickName, setNickName] = useState('')
  const [cash, setCash] = useState('0')
  const [gold, setGold] = useState('0')
  const [isBlock, setIsBlock] = useState('')
  const [avatar_index, setAvatar_index] = useState('')

  async function getPage() {
    const data = await getSignature()
    const total = data.data.res.total
    setPage(Math.ceil(total / limit))
    setData(data)
  }
  useEffect(() => {
    getPage()
    //getEdit()
  }, [limit])
  // useEffect(() => {
  //   getPage()
  // }, [limit, form])
  //
  // useEffect(() => {
  //   getPage()
  //   console.log('form')
  // }, [form])
  // console.log(() => {}, form)
  const getEdit = async (id) => {
    try {
      const result = await axios({
        method: `Get`,
        url: `${process.env.REACT_APP_URL_API}/api/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDataForm(result)

      setState(result?.data?.res?.data?.isBlock)
      setNickName(result?.data?.res?.data?.NickName)
      setCash(0)
      setGold(0)
      setAvatar_index(result?.data?.res?.data?.Avatar_index)

      return result
    } catch (err) {
      console.log('err')
    }
  }
  const getDelete = async (id) => {
    try {
      const result = await axios({
        method: `Get`,
        url: `${process.env.REACT_APP_URL_API}/api/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDataForm(result)
      setNickName(result?.data?.res?.data?.NickName)
      return result
    } catch (err) {
      console.log('err')
    }
  }
  const fetchPage = async (currentPage) => {
    try {
      const result = await axios({
        method: `Get`,
        url: `${process.env.REACT_APP_URL_API}/api/user?page=${currentPage}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return result
    } catch (err) {
      console.log('err')
    }
  }
  const handleDeleteForm = async (id) => {
    await getDelete(id)
    // setState(0)
    // setNickName(dataForm?.data?.res?.data?.NickName)
    setDeleteForm(!deleteForm)
  }
  const handleEdit = async (id) => {
    // dataEdit(id)
    await getEdit(id)
    setForm(!form)
    //
  }
  const handleDetail = async (id) => {
    await getEdit(id)

    setDetail(!detail)
  }
  const handlePageClick = async (data) => {
    setPageNumber(data.selected)
    let currentPage = data.selected + 1
    const pageFormServer = await fetchPage(currentPage)
    setData(pageFormServer)
  }
  const handleChange = (e) => {
    setState(e.target.value)
  }
  const onChangeNickName = (e) => {
    setNickName(e.target.value)
  }
  const onChangeCash = (e) => {
    setCash(e.target.value)
  }
  const onChangeGold = (e) => {
    setGold(e.target.value)
  }
  const onChangeIsBlock = (e) => {
    setIsBlock(e.target.value)
  }
  const onChangeAvatar_index = (e) => {
    setAvatar_index(e.target.value)
  }
  const handleSubmit = async (id) => {
    editData.append('NickName', nickName)
    editData.append('Cash', cash)
    editData.append('Gold', gold)
    editData.append('isBlock', state)
    editData.append('Avatar_index', avatar_index)
    await axios({
      method: 'Post',
      url: `${process.env.REACT_APP_URL_API}/api/user/update/${id}`,
      data: editData,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        console.log(response.data.errors)
      })
      .catch(function (err) {
        console.log(err)
      })
    const pageFormServer = await fetchPage(pageNumber + 1)
    setData(pageFormServer)

    setForm(!form)
  }
  const handleDelete = async (id) => {
    editData.append('NickName', nickName)
    editData.append('isBlock', 1)
    axios({
      method: 'Post',
      url: `${process.env.REACT_APP_URL_API}/api/user/update/${id}`,
      data: editData,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        console.log(response.data.errors)
      })
      .catch(function (err) {
        console.log(err)
      })
    const pageFormServer = await fetchPage(pageNumber + 1)
    setData(pageFormServer)
    setDeleteForm(!deleteForm)
  }

  return (
    <div>
      <CModal className="modal_edit" visible={form} onClose={() => setForm(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs={12}>
            <CFormInput
              label="Nick Name"
              placeholder="1234 Main St"
              onChange={onChangeNickName}
              // defaultValue={dataForm.data.cash}
              defaultValue={dataForm?.data?.res?.data?.NickName}
            />
          </CCol>
          <CCol xs={12}>
            <CFormInput
              label={`Gold (${dataForm?.data?.res?.data?.Cash})`}
              placeholder="1234 Main St"
              onChange={onChangeCash}
              defaultValue={0}
            />
          </CCol>
          <CCol xs={12}>
            <CFormInput
              label={`Gold (${dataForm?.data?.res?.data?.Gold})`}
              placeholder="1234 Main St"
              onChange={onChangeGold}
              defaultValue={0}
            ></CFormInput>
          </CCol>

          <CCol md={12}>
            <CFormSelect
              id="inputState"
              label="State"
              defaultValue={dataForm?.data?.res?.data?.isBlock}
              onClick={handleChange}
            >
              <option value={0}>Active</option>
              <option value={1}>Block</option>
            </CFormSelect>
          </CCol>
          <CCol xs={12}>
            <CFormInput
              label="Avatar index"
              placeholder="1234 Main St"
              onChange={onChangeAvatar_index}
              defaultValue={dataForm?.data?.res?.data?.Avatar_index}
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setForm(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSubmit(dataForm?.data?.res?.data?.uID)}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal className="modal_detail" visible={detail} onClose={() => setDetail(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs={17}>
              <CCard className="mb-4">
                <CCardBody>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Prop</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Data</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell scope="row">uID</CTableDataCell>
                        <CTableDataCell scope="row">{dataForm?.data?.res?.data.uID}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">UserID</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.UserID}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">UserCode</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.UserCode}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">loginKey</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.loginKey}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">NickName</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.NickName}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">Avatar_index</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.Avatar_index}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">v</CTableDataCell>
                        <CTableDataCell scope="row">{dataForm?.data?.res?.data.v}</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">accountLevel</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.accountLevel}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">accountExp</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.accountExp}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">Cash</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.Cash}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">Gold</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.Gold}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">leagueTier</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.leagueTier}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">isBlock</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.isBlock}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">registerDate</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.registerDate}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">lastAccessDate</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.lastAccessDate}
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">pendingGold</CTableDataCell>
                        <CTableDataCell scope="row">
                          {dataForm?.data?.res?.data.pendingGold}
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDetail(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal className="modal_del" visible={deleteForm} onClose={() => setDeleteForm(false)}>
        <CModalHeader>
          <CModalTitle>Are you sure want to delete</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton color="primary" onClick={() => handleDelete(dataForm?.data?.res?.data?.uID)}>
            Delete
          </CButton>
          <CButton color="secondary" onClick={() => setDeleteForm(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Account Table</strong>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nick Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Account Level</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cash</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gold</CTableHeaderCell>
                    <CTableHeaderCell scope="col">State</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data?.data?.res?.data?.data.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell scope="row">{index}</CTableDataCell>
                      <CTableDataCell scope="row">{item.NickName}</CTableDataCell>
                      <CTableDataCell colSpan="row">{item.UserID}</CTableDataCell>
                      <CTableDataCell>{item.accountLevel}</CTableDataCell>
                      <CTableDataCell>{item.Cash}</CTableDataCell>
                      <CTableDataCell>{item.Gold}</CTableDataCell>
                      <CTableDataCell>{item.isBlock === 1 ? 'Block' : 'Active'}</CTableDataCell>
                      <CTableDataCell>
                        <svg
                          onClick={() => handleDetail(item.uID)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          height={30}
                          width={30}
                          style={{ cursor: 'pointer' }}
                        >
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <svg
                          onClick={() => handleEdit(item.uID)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mx-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          height={28}
                          width={28}
                          style={{ cursor: 'pointer' }}
                        >
                          <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>

                        <svg
                          onClick={() => handleDeleteForm(item.uID)}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          height={30}
                          width={30}
                          style={{ cursor: 'pointer' }}
                        >
                          <path d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                        </svg>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ReactPaginate
        previousLabel={'< Previous'}
        nextLabel={'Next >'}
        breakLabel={'...'}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default Tables
