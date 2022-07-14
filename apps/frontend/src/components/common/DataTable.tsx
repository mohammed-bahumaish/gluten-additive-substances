/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table'

import { Table, TextInput, useMantineColorScheme } from '@mantine/core'
import { useModals } from '@mantine/modals'
import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'
import { useEffect, useMemo, useState } from 'react'
import { Edit, Trash } from 'tabler-icons-react'
import BlurredButton from './button/BlurredButton'
import DataForm from './DataForm'

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export interface Item {
  _id: string
  number: string
  description: string
  category: string
  status: string
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <TextInput
      placeholder="Search"
      className="w-full"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

const DataTable = ({
  data,
  isAdmin = false,
}: {
  data: any
  isAdmin: boolean
}) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const { colorScheme } = useMantineColorScheme()

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
      itemRank,
    })
    return itemRank.passed
  }

  const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0
    if (rowA.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]?.itemRank!,
        rowB.columnFiltersMeta[columnId]?.itemRank!,
      )
    }
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
  }

  const modals = useModals()

  const openContentModal = (item?: Item) => {
    modals.openModal({
      title: 'Add Item',
      children: <DataForm initialValues={item} />,
    })
  }

  const columns = useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: 'number',
        cell: info => info.getValue(),
        header: () => <span>Number</span>,
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'category',
        cell: info => info.getValue(),
        header: () => <span>Category</span>,
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'description',
        cell: info => info.getValue(),
        header: () => <span>Description</span>,
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'status',
        cell: info =>
          info.getValue() === 'GLUTEN FREE'
            ? '🟢 GLUTEN FREE'
            : `🟠 ${info.getValue()}`,
        header: () => <span>Status</span>,
        sortingFn: fuzzySort,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorScheme],
  )

  if (isAdmin)
    columns.push({
      accessorKey: '_id',
      cell: info => (
        <div className="flex cursor-pointer">
          <Edit
            size={20}
            strokeWidth={1}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
            onClick={() => {
              openContentModal(info.row.original)
            }}
          />
          <Trash
            size={20}
            strokeWidth={1}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
          />
        </div>
      ),
      header: () => <span>Action</span>,
    })

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  return (
    <>
      <div className="flex w-full max-w-2xl">
        <div className="flex-1">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
          />
        </div>
        {isAdmin && (
          <BlurredButton onClick={openContentModal as any} variant="subtle">
            Add
          </BlurredButton>
        )}
      </div>
      <Table className="pt-5 max-w-2xl" striped verticalSpacing="md">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default DataTable
