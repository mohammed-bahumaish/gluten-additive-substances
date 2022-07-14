import Layout from '@/components/common/layout'
import { FetchAllGlutenAdditives } from 'hooks/useGlutenAdditives'

const WorkInProgress = () => {
  const { data } = FetchAllGlutenAdditives()

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
export default WorkInProgress

WorkInProgress.Layout = Layout
