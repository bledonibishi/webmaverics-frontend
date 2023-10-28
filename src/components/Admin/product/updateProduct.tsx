import axiosInstance from '@/api/axiosInstance'
import React, { useState } from 'react'
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const UpdateProduct = () => {
  const [imageCover, setImageCover] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])

  const handleSubmit = (e: any) => {
    const formData = new FormData()
    if (imageCover) {
      formData.append('imageCover', imageCover)
    }
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }
    try {
      axiosInstance.patch(
        BASE_URL + `api/v1/products/653d390b38895eb87725241b`,
        formData
      )
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">submit</button>
    </form>
  )
}

export default UpdateProduct
