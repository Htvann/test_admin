import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import Form_Edit from 'src/views/pages/login/Form_Edit'
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
  CImage,
} from '@coreui/react'
// import { DocsExample } from 'src/components'
// import { set } from 'core-js/core/dict'
import ReactPaginate from 'react-paginate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import "./style.css"

const token = localStorage.getItem('token_key')

let limit = 5

const getSignature = async () => {
  try {
    const result = await axios({
      method: `Get`,
      url: `${process.env.REACT_APP_URL_API}/api/banner?page=1&limit=${limit}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return result
  } catch (err) {
    console.log('err')
  }
}

const formData = new FormData()
const editData = new FormData()

const Tables = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [pageNumber, setPageNumber] = useState()
  const [form, setForm] = useState(false)
  const [formEdit, setFormEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState(1)
  const [error, setError] = useState({})
  const [dataFormEdit, setDataFormEdit] = useState([])

  const navigate = useNavigate()

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeImage = (e) => {
    setImage(e.target.files[0])
  }

  async function getPage() {
    const data = await getSignature()
    console.log(data)
    const total = data.data.res.total
    setPage(Math.ceil(total / limit))
    setData(data)
  }

  useEffect(() => {
    getPage()
  }, [limit])

  const fetchPage = async (currentPage) => {
    try {
      const result = await axios({
        method: `Get`,
        url: `${process.env.REACT_APP_URL_API}/api/banner?page=${currentPage}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return result
    } catch (err) {
      console.log('err')
    }
  }

  const handlePageClick = async (data) => {
    setPageNumber(data.selected)

    let currentPage = data.selected + 1
    const pageFormServer = await fetchPage(currentPage)
    setData(pageFormServer)
  }

  const handleOpenAdd = () => {
    setForm(!form)
  }

  const validation = (e) => {
    const msg = {}

    if (title === '') {
      msg.title = 'Title is requied!'
    }

    if (image === "" ) {
      msg.image = 'Image is requied!'
    }

    setError(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }

  const handleKeyUp = (e) => {
    validation()
  }

  const handleSubmitAdd = async () => {
    const isValid = validation()

    if (isValid) {
      formData.append('title', title)
      formData.append('image', image)
      formData.append('status', 1)

      await axios({
        method: 'Post',
        url: `${process.env.REACT_APP_URL_API}/api/banner/add`,
        data: formData,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (err) {
          console.log(err)
        })

      setForm(!form)
      toast('Add success!')
    }
  }

  const getEdit = async (id) => {
    try {
      const result = await axios({
        method: `Get`,
        url: `${process.env.REACT_APP_URL_API}/api/banner/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
       //setDataFormEdit(result)
      // setTitle(result?.data?.res?.data?.title)
      // setImage(result?.data?.res?.data?.image)
      // setStatus(result?.data?.res?.data?.status)

      return result.data.res.data
    } catch (err) {
      console.log('err')
    }
  }

  const handleEdit = async (id) => {
     const dataEdit = await getEdit(id)
    //  console.log('aaa', dataEdit)
    setDataFormEdit(dataEdit)
    setTitle(dataEdit.title)
    setImage(dataEdit.image)
    setStatus(dataEdit.status)
    setFormEdit(!form)
  }

  const handleSubmitEdit = async (id) => {
    editData.append('title', title)
    editData.append('image', image)
    editData.append('status', 1)
    await axios({
      method: 'Post',
      url: `${process.env.REACT_APP_URL_API}/api/banner/update/${id}`,
      data: editData,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (err) {
        console.log(err)
      })

    const pageFormServer = await fetchPage(pageNumber + 1)
    setData(pageFormServer)

    setFormEdit(form)
  }

  const handleDelete = async (id) => {
    axios({
      method: 'Post',
      url: `${process.env.REACT_APP_URL_API}/api/banner/delete/${id}`,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (err) {
        console.log(err)
      })

    const pageFormServer = await fetchPage(pageNumber + 1)
    setData(pageFormServer)
  }

  return (
    <div>
      <CButton
        onClick={() => handleOpenAdd()}
        className="d-flex align-items-center justify-content-center py-0 mb-4 btn_add"
      >
        <span className="fs-3 pb-1 pe-2">+</span> Add
      </CButton>

      <CModal className="modal_add" visible={form} onClose={() => setForm(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs={12}>
            <CFormInput
              label="Title"
              placeholder=""
              onChange={onChangeTitle}
              defaultValue={title}
              name="title"
              onKeyUp={handleKeyUp}
              type="text"
            />
          </CCol>

          {error.title && <p className="text-danger">{error.title}</p>}

          <CCol xs={12}>
            <CFormInput
              label="Image"
              placeholder=""
              onChange={onChangeImage}
              defaultValue={image}
              name="image"
              type="file"
            />
          </CCol>

          {error.image && <p className="text-danger">{error.image}</p>}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setForm(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSubmitAdd()}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal className="modal_edit" visible={formEdit} onClose={() => setFormEdit(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs={12}>
            <CFormInput
              label="Title"
              placeholder=""
              onChange={onChangeTitle}
              defaultValue={dataFormEdit.title}
              onKeyUp={handleKeyUp}
              type="text"
            />
          </CCol>
{/* 
          {error.title && <p className="text-danger">{error.title}</p>} */}

          <CCol xs={12}>
            <CFormInput
              label="Image"
              placeholder=""
              onChange={onChangeImage}
              type="file"
            />
          </CCol>

          {/* {error.image && <p className="text-danger">{error.image}</p>} */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setFormEdit(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSubmitEdit(dataFormEdit.id)}>
            Submit
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
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data?.data?.res?.data?.data.map((item, index) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell scope="row">{index}</CTableDataCell>
                      <CTableDataCell scope="row">{item.title}</CTableDataCell>
                      <CTableDataCell colSpan="row">
                        <CImage
                          src={`${process.env.REACT_APP_URL_API}${item.image}`}
                          alt="img"
                          height={150}
                          width={150}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{item.status ? 'Active' : 'Block'}</CTableDataCell>
                      <CTableDataCell>
                        <svg
                          onClick={() => handleEdit(item.id)}
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
                          onClick={() => handleDelete(item.id)}
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
