/* eslint-disable import/no-cycle */
import { Loader, useMantineColorScheme } from '@mantine/core'
import { useDeleteOneGlutenAdditive } from 'hooks/useGlutenAdditives'
import { useQueryClient } from 'react-query'
import { Trash } from 'tabler-icons-react'

const DeleteButton = ({ _id }: { _id: string }) => {
  const { mutate, isLoading } = useDeleteOneGlutenAdditive()
  const queryClient = useQueryClient()
  const { colorScheme } = useMantineColorScheme()

  return isLoading ? (
    <Loader size="xs" />
  ) : (
    <Trash
      size={20}
      strokeWidth={1}
      color={colorScheme === 'dark' ? '#fff' : '#000'}
      onClick={() => {
        mutate(_id, {
          onSuccess: () => {
            queryClient.invalidateQueries('GlutenAdditives')
          },
        })
      }}
    />
  )
}

export default DeleteButton
