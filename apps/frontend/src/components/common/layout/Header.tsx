import { Header as MHeader, Title } from '@mantine/core'
import ChangeThemeIcon from '../button/ChangeThemeIcon'

const Header = () => (
  <MHeader height={60} p="xs">
    <div className="flex justify-between items-center px-10">
      <Title order={2}>🍞 Gluten Additives</Title>
      <ChangeThemeIcon />
    </div>
  </MHeader>
)

export default Header
