/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { Item } from '@/components/common/DataTable'
import { useMutation, useQuery } from 'react-query'
import axiosInstance from 'util/axios'

export const fetchAll = () =>
  axiosInstance.get('/additive').then(res => res.data)

export const createOne = (item: Item) =>
  axiosInstance.post('/additive', item).then(res => res.data)

export const updateOne = (item: Item) =>
  axiosInstance.put('/additive', item).then(res => res.data)

export const useFetchAllGlutenAdditives = ({
  initialData,
}: {
  initialData: any
}) => useQuery(['GlutenAdditives'], () => fetchAll(), { initialData })

export const useCreateOneGlutenAdditive = () =>
  useMutation(['AddGlutenAdditive'], (item: Item) => createOne(item))

export const useUpdateOneGlutenAdditive = () =>
  useMutation(['UpdateGlutenAdditive'], (item: Item) => updateOne(item))
