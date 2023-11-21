import { Image } from '@/helpers/helpers'
import { RatingInput } from '@/helpers/types'
import {
  useCreateRatingMutation,
  useGetRatingWithProductIdQuery,
} from '@/store/products/RTKProductSlice'
import { faRankingStar, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useState } from 'react'
import { Button, Form, FormLabel, InputGroup, Modal } from 'react-bootstrap'
import Rating from 'react-rating-stars-component'

const FullStar = () => <FontAwesomeIcon icon={faStar} />

type RatingModalProps = {
  show: boolean
  onHide: () => void
  userID: string
  productID: string
  productTitle: string
  productImage: string
}

const RatingModal: FC<RatingModalProps> = ({
  show,
  onHide,
  userID,
  productID,
  productTitle,
  productImage,
}) => {
  const [createRating, { isLoading }] = useCreateRatingMutation()
  const { refetch } = useGetRatingWithProductIdQuery(productID ? productID : '')
  const [formData, setFormData] = useState<RatingInput>({
    title: '',
    description: '',
    rating: 0,
    userID,
    productID,
  })

  const handleChange = (e: any) => {
    if (e.target) {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleCreateRating = async (e: any) => {
    e.preventDefault()
    try {
      const result = await createRating({ ...formData })
      console.log('result', result)
      refetch()
      onHide()
    } catch (error) {
      console.log('error', error)
    }

    setFormData({
      title: '',
      description: '',
      rating: 0,
      userID,
      productID,
    })
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shadow-bottom p-4 d-flex align-items-center">
          <span className="w-20 h-20 d-flex align-items-center justify-content-center mr-4">
            <Image
              src={productImage}
              className="max-h-full max-w-full"
              alt="product"
            />
          </span>
          <div className="d-flex flex-col">
            <span className="text-base text-gray-700">{productTitle}</span>
          </div>
        </div>
        <Form>
          <FormLabel htmlFor="title" id="inputGroup-sizing-default">
            Title: *
          </FormLabel>
          <InputGroup className="mb-3">
            <Form.Control
              name="title"
              aria-label="Default"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <FormLabel htmlFor="description" id="inputGroup-sizing-default">
            Description: *
          </FormLabel>
          <InputGroup className="mb-3">
            <Form.Control
              name="description"
              aria-label="Default"
              value={formData.description}
              onChange={(e) => handleChange(e)}
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          <FormLabel htmlFor="description" id="inputGroup-sizing-default">
            Description: *
          </FormLabel>
          <Form.Group>
            <Form.Label>Rating:</Form.Label>
            <Rating
              count={5}
              size={24}
              value={formData.rating}
              onChange={(newRating: number) => {
                const updatedFormData = { ...formData, rating: newRating }
                setFormData(updatedFormData)
              }}
              color="#ccc"
              activeColor="#f8b400"
              char={FullStar}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="w-100"
          onClick={handleCreateRating}
        >
          Rate
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RatingModal
