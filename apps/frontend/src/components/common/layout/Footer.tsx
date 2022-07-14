import { Header as MHeader, Text, Title } from '@mantine/core'
import Link from 'next/link'

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
      <Title order={2}>🍞 </Title>

      <Text>
        Created by{' '}
        <Link href="https://github.com/mohammed-gehad">
          <a>Mohammed Gehad</a>
        </Link>{' '}
        &{' '}
        <Link href="https://github.com/ahmeddeveloper55">
          <a>Ahamed Bawazir</a>
        </Link>{' '}
        @2022
      </Text>
    </div>
  </MHeader>
)

export default Footer
