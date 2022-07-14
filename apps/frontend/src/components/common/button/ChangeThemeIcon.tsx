import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { BiSun } from 'react-icons/bi'
import { BsMoonStars } from 'react-icons/bs'

const ChangeThemeIcon = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <ActionIcon
      variant="outline"
      color="gray"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      className="mx-2"
    >
      {dark ? <BiSun size={18} /> : <BsMoonStars size={18} />}
    </ActionIcon>
  )
}
export default ChangeThemeIcon
