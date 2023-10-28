import { ImageHelperTypes } from './types'
import React from 'react'

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

export const Image = ({ src, alt, className, ...props }: ImageHelperTypes) => {
  const baseUrl = 'http://127.0.0.1:5000/img/products/'
  return (
    <img src={`${baseUrl}${src}`} alt={alt} className={className} {...props} />
  )
}
