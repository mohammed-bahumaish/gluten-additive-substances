import { Header as MHeader, Text } from '@mantine/core'
import Link from 'next/link'
import { BrandGithub } from 'tabler-icons-react'

const Footer = () => (
  <MHeader
    height={60}
    p="xs"
    sx={({ colorScheme }) => ({
      borderTop:
        colorScheme === 'dark' ? '1px solid #2C2E33' : '1px solid #e9ecef',
    })}
  >
    <div className="flex justify-center items-center px-10">
      <Link href="https://github.com/mohammed-gehad/gluten-additive-substances">
        <div className="bg-slate-50 rounded-full p-1 mx-2 cursor-pointer">
          <BrandGithub size={30} strokeWidth={1.5} color="#000000" />
        </div>
      </Link>{' '}
      <Text>
        Created by{' '}
        <Link href="https://github.com/mohammed-gehad">
          <a>Mohammed Gehad</a>
        </Link>{' '}
        &{' '}
        <Link href="https://github.com/ahmeddeveloper55">
          <a> Ahmed Bawazir</a>
        </Link>{' '}
        @2022
      </Text>
    </div>
  </MHeader>
)

export default Footer
