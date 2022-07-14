/* eslint-disable import/no-cycle */
/* eslint-disable react/require-default-props */
import { Loader, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useModals } from '@mantine/modals'
import { useCreateOneGlutenAdditive } from 'hooks/useGlutenAdditives'
import { useQueryClient } from 'react-query'
import BlurredButton from './button/BlurredButton'
import { Item } from './DataTable'

const emptyValues = {
  number: '',
  description: '',
  category: '',
  status: '',
}

const DataForm = ({ initialValues }: { initialValues?: Item }) => {
  const form = useForm({
    initialValues: initialValues ?? emptyValues,
  })

  const { mutate, isLoading } = useCreateOneGlutenAdditive()
  const queryClient = useQueryClient()
  const modals = useModals()

  const onSuccess = () => {
    queryClient.invalidateQueries('GlutenAdditives')
    modals.closeAll()
  }

  const handleSubmit = (values: typeof form.values) => {
    if (!initialValues) {
      mutate(
        {
          ...values,
          _id: undefined,
        },
        {
          onSuccess,
        },
      )
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="relative">
      {isLoading && (
        <div className="absolute w-full h-full bg-slate-500 z-50 flex justify-center items-center rounded-xl bg-opacity-50">
          <Loader />
        </div>
      )}
      <TextInput
        placeholder="Number"
        label="Number"
        required
        {...form.getInputProps('number')}
      />
      <TextInput
        placeholder="Description"
        label="Description"
        required
        {...form.getInputProps('description')}
      />
      <TextInput
        placeholder="Category"
        label="Category"
        required
        {...form.getInputProps('category')}
      />
      <TextInput
        placeholder="Status"
        label="Status"
        required
        {...form.getInputProps('status')}
      />
      <BlurredButton fullWidth mt={5} type="submit">
        Save
      </BlurredButton>
    </form>
  )
}
export default DataForm
