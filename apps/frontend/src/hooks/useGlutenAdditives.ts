/* eslint-disable import/prefer-default-export */
import { Item } from '@/components/common/DataTable'
import { useMutation, useQuery } from 'react-query'
import axiosInstance from 'util/axios'

export const fetchAll = () =>
  axiosInstance.get('/additive').then(res => res.data)

export const createOne = (item: Item) =>
  axiosInstance.post('/additive', item).then(res => res.data)

export const useFetchAllGlutenAdditives = ({
  initialData,
}: {
  initialData: any
}) => useQuery(['GlutenAdditives'], () => fetchAll(), { initialData })

export const useCreateOneGlutenAdditive = () =>
  useMutation(['AddGlutenAdditive'], (item: Item) => createOne(item))
