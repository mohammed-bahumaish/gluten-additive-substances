/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import DataTable from '@/components/common/DataTable'
import InfinityLoader from '@/components/common/infinityLoader'
import Layout from '@/components/common/layout'
import { useFetchAllGlutenAdditives } from 'hooks/useGlutenAdditives'

const WorkInProgress = ({ initialData }: { initialData: any }) => {
  // const { data, isLoading } = useFetchAllGlutenAdditives({ initialData })
  const { data, isLoading } = useFetchAllGlutenAdditives({ initialData })

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <InfinityLoader variant="lg" />
      </div>
    )

  return (
    <div className="flex justify-center flex-col items-center m-2">
      <div className="rounded-3xl  max-w-2xl overflow-hidden my-2">
        <img src="/hero.svg" className="hover:scale-105 duration-100 " />
      </div>
      <DataTable data={data} isAdmin={false} />
    </div>
  )
}
export default WorkInProgress
WorkInProgress.Layout = Layout

export async function getStaticProps() {
  const initialData = await fetchAll()
  return {
    props: { initialData },
    revalidate: 10,
  }
}
