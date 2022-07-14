import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import React, { FC } from 'react'
import '../styles/globals.css'

const Noop: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
)

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const Layout = (Component as any).Layout ?? Noop

  return (
    <>
      <NextNProgress options={{ showSpinner: false, color: '#3adff5' }} />
      <Head>
        <title>app name</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withNormalizeCSS
          emotionOptions={{ key: 'mantine' }}
          theme={{
            colorScheme,
            primaryColor: 'cyan',
            defaultRadius: 5,
            fontFamily: 'Cairo, sans-serif',
          }}
          styles={{
            Table: theme => ({
              root: {
                backgroundColor: theme.fn.rgba(
                  theme.colors[theme.primaryColor]![5],
                  0.05,
                ),
                borderRadius: theme.defaultRadius,
                overflow: 'hidden',
                boxShadow: theme.shadows.md,
              },
            }),
          }}
        >
          <ModalsProvider>
            <NotificationsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default App
