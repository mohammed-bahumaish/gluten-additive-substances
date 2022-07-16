/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DataTable from '@/components/common/DataTable'
import InfinityLoader from '@/components/common/infinityLoader'
import Layout from '@/components/common/layout'
import { useFetchAllGlutenAdditives } from 'hooks/useGlutenAdditives'

const WorkInProgress = ({ initialData }: { initialData: any }) => {
  const { data, isLoading } = useFetchAllGlutenAdditives({ initialData })

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <InfinityLoader variant="lg" />
      </div>
    )

  return (
    <div className="flex justify-center flex-col items-center m-2">
      <DataTable data={data} isAdmin />
    </div>
  )
}
export default WorkInProgress
WorkInProgress.Layout = Layout

// export async function getServerSideProps() {
//   const initialData = await fetchAll()
//   return { props: { initialData } }
// }
