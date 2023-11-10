import { useGetProductCategoriesQuery } from '@/store/products/RTKProductSlice'
import { ImageHelperTypes, ProductCategory } from './types'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export function getCategoryNameById(
  categories: ProductCategory[],
  categoryId: string
) {
  const category = categories.find(
    (cat: ProductCategory) => cat._id === categoryId
  )
  return category ? category.name : 'Unknown Category'
}

export function getImage(filename: string) {
  return `src/assets/images/${filename}`
}
export function formatDateToDDMMYYYY(dateString: string) {
  const inputDate = new Date(dateString)

  const day = inputDate.getUTCDate().toString().padStart(2, '0')
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = inputDate.getUTCFullYear()

  return `${day}.${month}.${year}`
}
export function formatToDayOfWeek(dateString: string) {
  const inputDate = new Date(dateString)
  const options = { weekday: 'long' as const }

  return new Intl.DateTimeFormat('en-US', options).format(inputDate)
}
export function formatISODateToDayOfWeek(isoDateString: string) {
  const inputDate = new Date(isoDateString)
  const options = { weekday: 'long' as const }

  return new Intl.DateTimeFormat('en-US', options).format(inputDate)
}
export function formatISODateRange(
  isoDateString: string,
  numberOfDays: number
) {
  const inputDate = new Date(isoDateString)

  const endDate = new Date(inputDate)
  endDate.setDate(endDate.getDate() + numberOfDays)

  const startDay = inputDate.getUTCDate()
  const startMonth = inputDate.toLocaleString('default', { month: 'long' })
  const endDay = endDate.getUTCDate()
  const endMonth = endDate.toLocaleString('default', { month: 'long' })

  return `${startDay} ${startMonth} - ${endDay} ${endMonth}`
}
export function formatISODateRange2dates(
  numberOfDays1: number,
  numberOfDays2: number
) {
  const today = new Date()
  const futureDate1 = new Date(today)
  futureDate1.setDate(today.getDate() + numberOfDays1)
  const futureDate2 = new Date(today)
  futureDate2.setDate(today.getDate() + numberOfDays2)

  const startDay1 = futureDate1.getUTCDate()
  const startMonth1 = futureDate1.toLocaleString('default', { month: 'long' })
  const startDay2 = futureDate2.getUTCDate()
  const startMonth2 = futureDate2.toLocaleString('default', { month: 'long' })

  return `${startDay1} ${startMonth1} - ${startDay2} ${startMonth2}`
}

export const Image = ({ src, alt, className, ...props }: ImageHelperTypes) => {
  const baseUrl = 'http://127.0.0.1:5000/img/products/'
  return (
    <img src={`${baseUrl}${src}`} alt={alt} className={className} {...props} />
  )
}
export const generateOrderCode = () => {
  return uuidv4()
}

export const isPasswordLengthValid = (password: string) => password.length >= 8

export const containsSpecialCharacter = (password: string) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password)

export const containsNumber = (password: string) => /\d/.test(password)

export const containsUppercaseLetter = (password: string) =>
  /[A-Z]/.test(password)
