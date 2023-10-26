import axiosInstance from '@/api/axiosInstance'
import { Address, CreateAddress } from '@/helpers/types'

const API_URL = '/api/v1/address'

const fetchAddresses = async (): Promise<Address[]> => {
  const response = await axiosInstance.get(API_URL)

  return response.data
}

const deleteAddress = async (addressID: string): Promise<void> => {
  const response = await axiosInstance.delete(API_URL + `/${addressID}`)

  fetchAddresses()

  return response.data
}

const fetchAddressWithId = async (id: string): Promise<Address> => {
  try {
    const response = await axiosInstance.get(API_URL + `/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching address with ID')
  }
}

const updateAddress = async (
  id: string,
  body: CreateAddress
): Promise<Address> => {
  try {
    const response = await axiosInstance.patch(API_URL + `/${id}`, body)
    return response.data
  } catch (error) {
    throw new Error('Error fetching address with ID')
  }
}

const createAddress = async (body: CreateAddress): Promise<CreateAddress> => {
  try {
    const response = await axiosInstance.post(API_URL, body)

    return response.data
  } catch (error) {
    throw new Error('Error while creating address')
  }
}

const AddressesService = {
  fetchAddresses,
  fetchAddressWithId,
  deleteAddress,
  createAddress,
  updateAddress,
}

export default AddressesService
