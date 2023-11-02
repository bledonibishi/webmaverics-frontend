import { RatingInput } from '@/helpers/types'
import { useCreateRatingMutation } from '@/store/products/RTKProductSlice'
import { faRankingStar, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
} from 'react-bootstrap'
import Rating from 'react-rating-stars-component'

const FullStar = () => <FontAwesomeIcon icon={faStar} />

type RatingModalProps = {
  show: boolean
  onHide: () => void
  userID: string
  productID: string
}

const RatingModal: FC<RatingModalProps> = ({
  show,
  onHide,
  userID,
  productID,
}) => {
  const [createRating, { isLoading }] = useCreateRatingMutation()
  const [formData, setFormData] = useState<RatingInput>({
    title: '',
    description: '',
    rating: 0,
    userID,
    productID,
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    console.log('name', name, value)

    if (e.target) {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
  }

  const [rating, setRating] = useState(0)

  const handleCreateRating = async (e: any) => {
    try {
      const result = await createRating({ ...formData })
      // Handle the result, e.g., show a success message
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
            <img
              className="max-h-full max-w-full"
              src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/88cc6478-2cc5-42f7-830d-2d96eb640d14/thumb/88cc6478-2cc5-42f7-830d-2d96eb640d14.jpeg"
            />
          </span>
          <div className="d-flex flex-col">
            <span className="text-base text-gray-700">
              Apple iPhone 15 Pro, 128GB, Natural Titanium
            </span>
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
