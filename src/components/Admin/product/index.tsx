import { Product, ProductInput } from '@/helpers/types'
import { useAppDispatch } from '@/hooks/hooks'
import { WithContext as ReactTags } from 'react-tag-input'
import { TagsInput } from 'react-tag-input-component'
// import TagsInput from 'react-tagsinput'
// import 'react-tagsinput/react-tagsinput.css'
import {
  useCreateProductMutation,
  useGetProductCategoriesQuery,
  useGetProductsQuery,
} from '@/store/products/RTKProductSlice'
import React, { ChangeEvent, useState } from 'react'
import axiosInstance from '@/api/axiosInstance'
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const CreateProduct = () => {
  const dispatch = useAppDispatch()
  const [file, setFile] = useState<any>(null)
  const handleUpload = (e: any) => {
    const formData = new FormData()
    formData.append('file', file)
    axiosInstance
      .post('/api/v1/products/createProduct', formData)
      .then((res) => console.log('res', res))
  }
  const { data: products } = useGetProductsQuery()
  const { data: categories } = useGetProductCategoriesQuery()
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
    console.log('type', type)
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
  // const handleVariantChange = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const { name, value } = e.target
  //   const updatedVariants = [...formData.variants]
  //   updatedVariants[index] = {
  //     ...updatedVariants[index],
  //     [name]: value,
  //   }
  //   setFormData({ ...formData, variants: updatedVariants })
  // }

  // const addVariant = () => {
  //   const newVariant = [
  //     ...formData.variants,
  //     { name: '', price: 0, stock: 0, isAvailable: true },
  //   ]
  //   setFormData({ ...formData, variants: newVariant })
  // }

  // const removeVariant = (index: number) => {
  //   const updatedVariants = [...formData.variants]
  //   updatedVariants.splice(index, 1)
  //   setFormData({ ...formData, variants: updatedVariants })
  // }
  const handleRelatedProductsChange = (selectedProducts: any) => {
    setFormData({ ...formData, relatedProducts: selectedProducts })
  }

  console.log('formData', formData)

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

    // setFormData({
    //   title: '',
    //   details: [],
    //   brand: '',
    //   discount: 0,
    //   tfTransport: false,
    //   warranty: '',
    //   isNew: false,
    //   summary: '',
    //   description: '',
    //   imageCover: null,
    //   images: [],
    //   price: 0,
    //   category: '',
    //   stock: 0,
    //   variants: [],
    //   relatedProducts: [],
    //   tags: [],
    //   productStatus: '',
    //   createdBy: '',
    // })
  }

  return (
    <div className="master-wrapper-content mx-auto p-0">
      <h2>Create a New Product</h2>
      <div
        className="item-grid grid grid-cols-6 gap-2 md:grid-cols-6 lg:grid-cols-6 position-relative w-100 p-0"
        style={{ marginLeft: '1px' }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="details">Details:</label>
            <button type="button" onClick={addDetail}>
              Add Detail
            </button>
          </div>
          {formData.details.map((detail, index) => (
            <div key={index}>
              <input
                type="text"
                name="key"
                value={detail.key}
                onChange={(e) => handleDetailChange(e, index)}
                placeholder="Key"
              />
              <input
                type="text"
                name="value"
                value={detail.value}
                onChange={(e) => handleDetailChange(e, index)}
                placeholder="Value"
              />
            </div>
          ))}
          <div>
            <label htmlFor="ratingsAverage">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="ratingsAverage">Discount:</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tfTransport">TF Transport:</label>
            <input
              type="checkbox"
              id="tfTransport"
              name="tfTransport"
              checked={formData.tfTransport}
              onChange={handleChange}
            />
          </div>
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
          <div>
            <label htmlFor="isNew">Is new:</label>
            <input
              type="checkbox"
              id="isNew"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="summary">Summary:</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="imageCover">Image cover:</label>
            <input
              type="file"
              id="imageCover"
              name="imageCover"
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
          <div>
            <label htmlFor="images">Additional Images:</label>
            <input
              type="file"
              id="images"
              name="images"
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
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
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
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label>Product Variants:</label>
            {formData.variants.map((variant, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  value={variant.name}
                  onChange={(e) => handleVariantChange(e, index)}
                  placeholder="Variant Name"
                />
                <input
                  type="number"
                  name="price"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(e, index)}
                  placeholder="Variant Price"
                />
                <button type="button" onClick={() => removeVariant(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addVariant}>
              Add Variant
            </button>
          </div> */}
          {/* <div>
            <label htmlFor="reviews">Reviews:</label>
            <input
              type="text"
              id="reviews"
              name="reviews"
              value={formData.reviews.join(', ')}
              onChange={handleChange}
            />
          </div> */}
          <div>
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
          <div>
            <label htmlFor="tags">Tags:</label>
            <TagsInput
              value={formData.tags}
              //   id="tags"
              onChange={handleChangeTags}
              name="tags"
            />
          </div>

          <div>
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

          <div>
            <label htmlFor="createdBy">Created By:</label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
