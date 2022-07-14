/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query'
import axiosInstance from 'util/axios'

const fetchAll = () => axiosInstance.get('/additive')
export const FetchAllGlutenAdditives = () =>
  useQuery(['GlutenAdditives'], () => fetchAll())
