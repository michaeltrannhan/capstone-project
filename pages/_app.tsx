import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Component {...pageProps} />
    // </LocalizationProvider>

  )
}
