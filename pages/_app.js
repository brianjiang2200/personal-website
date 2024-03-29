import '../public/static/css/prism.css'
import 'remixicon/fonts/remixicon.css'

import Router from 'next/router'
import * as gtag from '../lib/gtag'
import CommandBar from '../components/CommandBar'
import { NextUIProvider, createTheme } from '@nextui-org/react'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

const Noop = ({ children }) => children

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop

  const darkTheme = createTheme({
    type: 'dark', theme: {
      colors: {}
    }  
  })

  return (
    <NextUIProvider theme={darkTheme}>
      <CommandBar>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommandBar>
    </NextUIProvider>
  )
}
