/* eslint-disable import/no-cycle */
/* eslint-disable react/require-default-props */
import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
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

  const handleSubmit = (values: typeof form.values) => {
    console.log({ values })
  }
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
        Add
      </BlurredButton>
    </form>
  )
}
export default DataForm
