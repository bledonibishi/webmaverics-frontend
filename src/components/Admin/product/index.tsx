import { Product, ProductInput } from '@/helpers/types'
import { useAppDispatch } from '@/hooks/hooks'
import { WithContext as ReactTags } from 'react-tag-input'
import { TagsInput } from 'react-tag-input-component'
import './style.css'
import {
  useCreateProductMutation,
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from '@/store/products/RTKProductSlice'
import React, { ChangeEvent, useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
import { Button, Col, Row } from 'react-bootstrap'
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const CreateProduct = () => {
  const { data: products } = useGetProductsQuery()
  const { data: categories } = useGetProductCategoriesQuery()
  const [createProduct] = useCreateProductMutation()
  const [imageCover, setImageCover] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState<ProductInput>({
    title: '',
    details: [],
    brand: '',
    discount: null,
    tfTransport: false,
    warranty: '',
    isNew: false,
    summary: '',
    description: '',
    imageCover: null,
    images: [],
    price: 0,
    category: '',
    stock: 0,
    relatedProducts: [],
    tags: [],
    productStatus: '',
    createdBy: '',
  })

  const handleChange = (e: any) => {
    const { name, type, checked, files } = e.target
    let inputValue

    if (type === 'checkbox') {
      inputValue = checked
    } else if (type === 'file') {
      if (name === 'images') {
        inputValue = Array.from(files).map((file: any) => file.name)
      } else if (name === 'imageCover') {
        inputValue = files[0]
      } else {
        inputValue = files[0]
      }
    } else {
      inputValue = e.target.value
    }

    setFormData({ ...formData, [name]: inputValue })
  }

  const handleChangeTags = (tags: any) => {
    setFormData({ ...formData, tags })
  }

  const addDetail = () => {
    const newDetails = [...formData.details, { key: '', value: '' }]
    setFormData({ ...formData, details: newDetails })
  }

  const handleDetailChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target
    const updatedDetails = [...formData.details]
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    }
    setFormData({ ...formData, details: updatedDetails })
  }

  const removeDetail = (index: number) => {
    const updatedDetails = [...formData.details]
    updatedDetails.splice(index, 1)
    setFormData({ ...formData, details: updatedDetails })
  }
  const handleRelatedProductsChange = (selectedProducts: any) => {
    setFormData({ ...formData, relatedProducts: selectedProducts })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const formDataa = new FormData()
    if (imageCover) {
      formDataa.append('imageCover', imageCover)
    }
    for (let i = 0; i < images.length; i++) {
      formDataa.append('images', images[i])
    }
    formDataa.append('title', formData.title)
    formDataa.append('brand', formData.brand)
    formDataa.append('discount', String(formData.discount))
    formDataa.append('tfTransport', formData.tfTransport ? '1' : '0')
    formDataa.append('warranty', formData.warranty)
    formDataa.append('isNew', formData.isNew ? '1' : '0')
    formDataa.append('summary', formData.summary)
    formDataa.append('description', formData.description)
    formDataa.append('price', formData.price.toString())
    formDataa.append('category', formData.category)
    formDataa.append('stock', formData.stock.toString())
    formDataa.append('productStatus', formData.productStatus)
    formDataa.append('createdBy', formData.createdBy)

    formData.details.forEach((detail, index) => {
      formDataa.append(`details[${index}][key]`, detail.key)
      formDataa.append(`details[${index}][value]`, detail.value)
    })

    const relatedProducts = formData.relatedProducts
    for (let i = 0; i < relatedProducts.length; i++) {
      formDataa.append('relatedProducts[]', relatedProducts[i])
    }
    const tags = formData.tags
    for (let i = 0; i < tags.length; i++) {
      formDataa.append('tags[]', tags[i])
    }

    try {
      axiosInstance.post(BASE_URL + `api/v1/products/createProduct`, formDataa)
    } catch (error) {
      console.log('error', error)
    }

    setFormData({
      title: '',
      details: [],
      brand: '',
      discount: null,
      tfTransport: false,
      warranty: '',
      isNew: false,
      summary: '',
      description: '',
      imageCover: null,
      images: [],
      price: 0,
      category: '',
      stock: 0,
      relatedProducts: [],
      tags: [],
      productStatus: '',
      createdBy: '',
    })
  }

  return (
    <div className="master-wrapper-content px-2 md:px-0 mx-auto">
      <div className="master-column-wrapper my-6">
        <div
          // item-grid d-grid grid-cols-6 gap-2 md:grid-cols-6 lg:grid-cols-6 position-relative w-100 p-0
          className="create-product "
          style={{ marginLeft: '1px' }}
        >
          <h2>Create a New Product</h2>

          {/* <form onSubmit={handleSubmit}> */}
          <Row>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />

                <p
                  className={`text-danger pb-2 text-xs ${
                    formData.title !== '' ? 'hidden' : ''
                  } `}
                >
                  Hapësira 'title' nuk duhet të jetë e zbrazët!
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="ratingsAverage">Brand:</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          <Col md="12">
            <div className="personal-info__input">
              <label htmlFor="details">Details:</label>
              <div className="d-flex justify-content-between py-1">
                <Button
                  type="button"
                  className="btn btn-success"
                  onClick={addDetail}
                >
                  Add Detail
                </Button>
                <Button
                  className="btn btn-danger"
                  type="button"
                  onClick={(e: any) => removeDetail(e)}
                >
                  Remove Detail
                </Button>
              </div>
            </div>
            {formData.details.map((detail, index) => (
              <Row key={index} className="product-details personal-info__input">
                <Col md="6">
                  <input
                    type="text"
                    name="key"
                    value={detail.key}
                    onChange={(e) => handleDetailChange(e, index)}
                    placeholder="Key"
                  />
                </Col>
                <Col md="6">
                  <input
                    type="text"
                    name="value"
                    value={detail.value}
                    onChange={(e) => handleDetailChange(e, index)}
                    placeholder="Value"
                  />
                </Col>
              </Row>
            ))}
          </Col>
          <Row>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="ratingsAverage">Discount:</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={
                    formData.discount !== null &&
                    formData.discount !== undefined
                      ? formData.discount
                      : ''
                  }
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col md="6">
              <div>
                <label htmlFor="warranty">Warranty:</label>
                <input
                  type="text"
                  id="warranty"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>

          <div className="personal-info__input">
            <label htmlFor="summary">Summary:</label>
            <textarea
              cols={5}
              rows={10}
              // type="text"
              className="w-100"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="personal-info__input">
            <label htmlFor="description">Description:</label>
            <textarea
              cols={5}
              rows={10}
              className="w-100"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <Row>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="imageCover" className="custom-file-upload">
                  <i className="fa fa-cloud-upload"></i> Image cover
                </label>
                <input
                  type="file"
                  id="imageCover"
                  name="imageCover"
                  className="custom-file-upload"
                  onChange={(e) => {
                    const files = e.target.files
                    if (files && files.length > 0) {
                      setImageCover(files[0])
                    } else {
                      setImageCover(null)
                    }
                  }}
                />
              </div>
            </Col>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="images" className="custom-file-upload">
                  <i className="fa fa-cloud-upload"></i> Additional images
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  className="custom-file-upload"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                      const fileArray = Array.from(files)
                      setImages(fileArray)
                    } else {
                      setImages([])
                    }
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row md="6">
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          <Col md="12">
            <div className="personal-info__input">
              <label htmlFor="category">Category:</label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories?.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <div className="personal-info__input">
            <label htmlFor="relatedProducts">Related Products:</label>
            <select
              multiple
              id="relatedProducts"
              name="relatedProducts"
              value={formData.relatedProducts}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.options)
                const selectedProductIds = selectedOptions
                  .filter((option) => option.selected)
                  .map((option) => option.value)
                handleRelatedProductsChange(selectedProductIds)
              }}
            >
              {products?.map((product, index) => (
                <option key={index} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>
          </div>
          <div className="personal-info__input">
            <label htmlFor="tags">Tags:</label>
            <TagsInput
              value={formData.tags}
              //   id="tags"
              // classNames={'tags'}
              onChange={handleChangeTags}
              name="tags"
            />
          </div>
          <Row>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="productStatus">Product Status:</label>
                <select
                  id="productStatus"
                  name="productStatus"
                  value={formData.productStatus}
                  onChange={handleChange}
                >
                  <option value="">Select product status</option>
                  <option value="active">Active</option>
                  <option value="outofstock">Out of stock</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
            </Col>
            <Col md="6">
              <div className="personal-info__input">
                <label htmlFor="createdBy">Created By:</label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
          {/* <Row> */}
          {/* <div className=" d-flex align-items-center justify-content-between position-relative"> */}
          <div className="personal-info__input">
            <div className="d-flex align-items-center justify-content-between position-relative mb-4">
              <span className="text-sm">24H</span>
              <div className="toggle-btn-wrapper">
                <input
                  type="checkbox"
                  id="tfTransport"
                  className="toggle-btn"
                  name="tfTransport"
                  checked={formData.tfTransport}
                  onChange={handleChange}
                />
                <div className="knobs"></div>
                <div className="layer"></div>
              </div>
            </div>
          </div>

          <div className="personal-info__input">
            <div className="d-flex align-items-center  justify-content-between position-relative">
              <span className="text-sm">New</span>
              <div className="toggle-btn-wrapper">
                <input
                  id="isNew"
                  type="checkbox"
                  className="toggle-btn"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                />
                <div className="knobs"></div>
                <div className="layer"></div>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* </Row> */}
          <div>
            <button
              type="submit"
              className="btn btn-primary btn-primary-hover w-100"
            >
              Create Product
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
