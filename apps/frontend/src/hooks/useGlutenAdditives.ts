/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query'
import axiosInstance from 'util/axios'

export const fetchAll = () =>
  axiosInstance.get('/additive').then(res => res.data)
export const FetchAllGlutenAdditives = ({
  initialData,
}: {
  initialData: any
}) => useQuery(['GlutenAdditives'], () => fetchAll(), { initialData })
