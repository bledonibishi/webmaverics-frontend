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
import axiosInstance from '@/api/axiosInstance'
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'

const CreateProduct = () => {
  const { data: products } = useGetProductsQuery()
  const { data: categories } = useGetProductCategoriesQuery()
  const [validated, setValidated] = useState(false)
  const [createProduct] = useCreateProductMutation()
  const [imageCover, setImageCover] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState<ProductInput>({
    title: '',
    details: [],
    brand: '',
    discount: 0,
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

  const handleSubmit = (event: any) => {
    const form = event.currentTarget
    console.log('e.currentTarget', event.currentTarget)
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

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
      discount: 0,
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
        <div className="create-product " style={{ marginLeft: '1px' }}>
          <h2>Create a New Product</h2>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md="6" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid title.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid brand.
                </Form.Control.Feedback>
              </Form.Group>
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
                <Row key={index} className="d-flex ">
                  <Form.Group as={Col} md="6" controlId="key">
                    <Form.Label>Key</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="key"
                      value={detail.key}
                      onChange={(e: any) => handleDetailChange(e, index)}
                      placeholder="Key"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid brand.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="value">
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="value"
                      value={detail.value}
                      onChange={(e: any) => handleDetailChange(e, index)}
                      placeholder="Value"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid brand.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              ))}
            </Col>

            <Row>
              <Form.Group as={Col} md="6" controlId="discount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Discount"
                  name="discount"
                  value={
                    formData.discount !== null &&
                    formData.discount !== undefined
                      ? formData.discount
                      : ''
                  }
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid brand.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="warranty">
                <Form.Label>Warranty</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Warranty"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid brand.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group as={Col} md="12" controlId="summary">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid summary.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide a valid description.
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Form.Group as={Col} md="6" controlId="imageCover">
                <Form.Label>Image cover</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder="Warranty"
                  name="imageCover"
                  className="custom-file-upload"
                  onChange={(e: any) => {
                    const files = e.target.files
                    if (files && files.length > 0) {
                      setImageCover(files[0])
                    } else {
                      setImageCover(null)
                    }
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid file.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="images">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder="Images"
                  name="images"
                  className="custom-file-upload"
                  multiple
                  onChange={(e: any) => {
                    const files = e.target.files
                    if (files) {
                      const fileArray: any = Array.from(files)
                      setImages(fileArray)
                    } else {
                      setImages([])
                    }
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid images.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row md="6">
              <Form.Group as={Col} md="6" controlId="warranty">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid price.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid stock.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group as={Col} md="12" controlId="category">
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories?.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please select a category.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="relatedProducts">
              <Form.Label>Related products:</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="relatedProducts"
                value={formData.relatedProducts}
                onChange={(e: any) => {
                  const selectedOptions = Array.from(e.target.options)
                  const selectedProductIds = selectedOptions
                    .filter((option: any) => option.selected)
                    .map((option: any) => option.value)
                  handleRelatedProductsChange(selectedProductIds)
                }}
                required
              >
                {products?.map((product, index) => (
                  <option key={index} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              {/* <Form.Control.Feedback type="invalid">
                Please select a related product.
              </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="tags">
              <Form.Label>Tags:</Form.Label>
              <TagsInput
                value={formData.tags}
                onChange={handleChangeTags}
                name="tags"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please provide at least one tag.
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md="6">
                <div className="personal-info__input">
                  <label htmlFor="productStatus">Product Status:</label>
                  <select
                    id="productStatus"
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select product status</option>
                    <option value="active">Active</option>
                    <option value="outofstock">Out of stock</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please select a product status.
                  </Form.Control.Feedback>
                </div>
              </Col>
              <Form.Group as={Col} md="6" controlId="createdBy">
                <Form.Label>Created By</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Created By"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid stock.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
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
            <Button
              type="submit"
              className="btn btn-primary btn-primary-hover w-100"
            >
              Create Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
