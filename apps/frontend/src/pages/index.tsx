/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import Layout from '@/components/common/layout'
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
import { fetchAll, FetchAllGlutenAdditives } from 'hooks/useGlutenAdditives'

import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'
import { useEffect, useMemo, useState } from 'react'
import InfinityLoader from '@/components/common/infinityLoader'
import { Table, TextInput } from '@mantine/core'
import Image from 'next/image'

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

interface Item {
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
      className="max-w-2xl w-full"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

const WorkInProgress = ({ initialData }: { initialData: any }) => {
  const { data, isLoading } = FetchAllGlutenAdditives({ initialData })
  const [globalFilter, setGlobalFilter] = useState('')

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
    [],
  )

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <InfinityLoader variant="lg" />
      </div>
    )

  return (
    <div className="flex justify-center flex-col items-center">
      <div
        style={{ position: 'relative', width: '672px', height: '405px' }}
        className="rounded-3xl overflow-hidden my-2 shadow-inner"
      >
        <Image
          src="/hero.svg"
          layout="fill"
          objectFit="cover"
          className="hover:scale-105 duration-100"
        />
      </div>
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
      />
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
    </div>
  )
}
export default WorkInProgress
WorkInProgress.Layout = Layout

export async function getServerSideProps() {
  const initialData = await fetchAll()
  return { props: { initialData } }
}
