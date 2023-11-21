import axiosInstance from '@/api/axiosInstance'
import { Image } from '@/helpers/helpers'
import { ProductInput } from '@/helpers/types'
import {
  useGetProductByIdQuery,
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from '@/store/products/RTKProductSlice'
import React, { ChangeEvent, useEffect, useState } from 'react'
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { useParams } from 'react-router-dom'
import { TagsInput } from 'react-tag-input-component'

const UpdateProduct = () => {
  const { id } = useParams()
  const { data: categories } = useGetProductCategoriesQuery()
  const { data: products } = useGetProductsQuery()
  const { data: product } = useGetProductByIdQuery(id ? id : '')
  const [imageCover, setImageCover] = useState<File | string | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [validated, setValidated] = useState(false)
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

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        details: product.details,
        brand: product.brand,
        discount: product.discount,
        tfTransport: product.tfTransport,
        warranty: product.warranty,
        isNew: product.isNew,
        summary: product.summary,
        description: product.description,
        imageCover: product.imageCover ? product.imageCover : null,
        images: product.images,
        price: product.price,
        category: product.category,
        stock: product.stock,
        relatedProducts: product.relatedProducts,
        tags: product.tags,
        productStatus: product.productStatus,
        createdBy: product.createdBy,
      })
    }
  }, [product])

  useEffect(() => {
    if (product) {
      setImages(product.images)
      setImageCover(product.imageCover ? product.imageCover : null)
    }
  }, [product?.images, product?.imageCover])

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
        inputValue = null
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

  console.log('formData', formData)

  const handleSubmit = async (e: any) => {
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
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
      const response = await axiosInstance.patch(
        BASE_URL + `api/v1/products/${id}`,
        formDataa
      )
      console.log('Product updated successfully:', response.data)
      // Optionally, you can handle success, e.g., show a success message.
    } catch (error) {
      console.error('Error updating product:', error)
      // Optionally, you can handle errors, e.g., show an error message.
    }
  }
  console.log('formData.details', formData.images)

  return (
    <div className="master-wrapper-content px-2 md:px-0 mx-auto">
      <div className="master-column-wrapper my-6">
        <div className="create-product " style={{ marginLeft: '1px' }}>
          <h2>Edit product</h2>
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
            <Row className="py-2">
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
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid file.
                </Form.Control.Feedback> */}
              </Form.Group>
              <Image
                // src={`http://127.0.0.1:5000/img/products/${imageCover}`}
                src={typeof imageCover === 'string' ? imageCover : ''}
                alt="product-image"
                className="  transition-all duration-300  object-contain"
                // style={{ height: '10rem', width: '10rem ' }}
              />
            </Row>
            <Row className="align-items-center py-2">
              <Form.Group as={Col} md="2" controlId="images">
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
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid images.
                </Form.Control.Feedback> */}
              </Form.Group>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={`http://127.0.0.1:5000/img/products/${image}`}
                  alt="product-image"
                  className="transition-all duration-300 object-contain pr-2 border-r"
                  style={{ height: '5rem', width: '5rem ' }}
                />
              ))}
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
                  <option
                    key={index}
                    value={product.id}
                    selected={formData.relatedProducts.includes(product.id)}
                  >
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
              Update Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
