import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { HeadComponent } from '../containers/head/Head'
import { I18nextProvider } from "react-i18next"
import i18next from 'i18next'
import { getUserLocales } from 'get-user-locale';
import { useRouter } from 'next/router'
import { Layout } from '../containers/layouts/Layout'
import { useEffect } from 'react'
import { ThemeProvider } from '@material-tailwind/react'
import { THEME } from '../styles/ThemeProvider'
// import { AuthProvider } from '../store/useAuth'
// import { ProtectRoute } from '../common/ProtectRoute'
import { Paths } from '@/constants/Paths'
import { ToastContainer } from 'react-toastify'


export default function App({ Component, pageProps }: AppProps) {
  // check if the page have layout
  const router = useRouter()
  const path =  "/" + router.pathname.split("/")[1];
  // const withLayout = [Paths.home, Paths.article];
	// const haveLayout = withLayout.includes(path);

  useEffect(() => {
    document.body.classList.add("h-full")
		// haveLayout ? document.body.classList.add("h-full") : document.body.classList.remove("h-full");
	}, []);


  return (
    <>
      <I18nextProvider i18n={i18next}>
        <HeadComponent title={null} />
        {/* <AuthProvider> */}
          {/* <ProtectRoute> */}
              <ThemeProvider value={THEME}>
              <ToastContainer hideProgressBar={true} position="top-center" autoClose={1000} limit={2} theme="light" closeOnClick={true} />
								{/* <NextProgressBar color="#eb1034" height={2} options={{showSpinner : false}}/> */}
									<Layout>
										<Component {...pageProps} />
									</Layout>
              </ThemeProvider>
          {/* </ProtectRoute> */}
        {/* </AuthProvider> */}
      </I18nextProvider>
    </>)
}
