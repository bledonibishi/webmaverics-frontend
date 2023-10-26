import { Address, CreateAddress } from '@/helpers/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AddressesService from './addressesService'
import { useAppDispatch } from '@/hooks/hooks'
// const dispatch = useAppDispatch()

type initialStateTypes = {
  loading: boolean
  success: boolean
  error: string | null
  addresses: Address[]
  address: Address | null
  message: string
}

const initialState: initialStateTypes = {
  loading: false,
  success: false,
  error: null,
  addresses: [],
  address: null,
  message: '',
}

export const getAllAddresses = createAsyncThunk(
  'addresses/getAllAddresses',
  async (_, thunkAPI) => {
    try {
      return await AddressesService.fetchAddresses()
    } catch (error) {
      // console.log('error', error.response.data)
      return thunkAPI.rejectWithValue('Error fetching addresses')
    }
  }
)

export const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (addressID: string, thunkAPI) => {
    try {
      const newAddresses = await AddressesService.deleteAddress(addressID)
      return newAddresses
    } catch (error) {
      return thunkAPI.rejectWithValue('Error while trying to delete an address')
    }
  }
)

export const createAddress = createAsyncThunk(
  'addresses/createAddress',
  async (body: CreateAddress, thunkAPI) => {
    try {
      return await AddressesService.createAddress(body)
    } catch (error) {
      return thunkAPI.rejectWithValue('Error while trying to create an address')
    }
  }
)

export const getAddressWithId = createAsyncThunk(
  'addresses/getAddressWithId',
  async (id: string, thunkAPI) => {
    try {
      return await AddressesService.fetchAddressWithId(id)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Error while trying to get an address with id'
      )
    }
  }
)

export const updateAddress = createAsyncThunk<
  Address,
  { id: string; body: CreateAddress },
  {
    rejectValue: string
  }
>('addresses/updateAddress', async ({ id, body }, thunkAPI) => {
  try {
    console.log('id', id)
    console.log('body', body)
    return await AddressesService.updateAddress(id, body)
  } catch (error) {
    return thunkAPI.rejectWithValue(
      'Error while trying to get an address with id'
    )
  }
})

const addressesSlice = createSlice({
  name: 'addressesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddresses.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loading = false
        state.addresses = action.payload
        state.success = true
        state.error = null
        state.message = 'Success'
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = null
        state.message = 'Something went wrong. Please try againg later!'
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.addresses = state.addresses.filter(
          (item) => item.id !== action.meta.arg
        )
        state.message = 'Address was successfuly deleted'
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = null
        state.message = 'Something went wrong. Please try againg later!'
      })
      .addCase(createAddress.pending, (state) => {
        state.loading = true
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.message = 'Address was successfuly deleted'
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = null
        state.message = 'Something went wrong. Please try againg later!'
      })
      .addCase(getAddressWithId.pending, (state) => {
        state.loading = true
      })
      .addCase(getAddressWithId.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.address = action.payload
        state.error = null
        state.message = 'Address was successfuly deleted'
      })
      .addCase(getAddressWithId.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = null
        state.message = 'Something went wrong. Please try againg later!'
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        // state.address = action.payload
        state.error = null
        state.message = 'Address was successfuly deleted'
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = null
        state.message = 'Something went wrong. Please try againg later!'
      })
  },
})
export default addressesSlice.reducer
