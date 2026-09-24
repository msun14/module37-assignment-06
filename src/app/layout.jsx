import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DEMO_MODE } from '@/lib/workouts';
const displayFont = localFont({ src: '../../public/fonts/display-bold.otf', variable: '--font-display', display: 'swap' });
export const metadata = {
  title: { default: 'FitLog | Workout Library', template: '%s | FitLog' },
  description: 'Pick a lift, build your workout plan, and log every set with FitLog.',
  icons: { icon: '/images/logo.png' },
};
export default function RootLayout({ children }) {
  return <html lang="en"><body className={displayFont.variable}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Providers><Navbar />
      {DEMO_MODE && <div className="demo-notice">Demo mode · Sample records and banner artwork. Live API data is disabled.</div>}
      {children}<Footer />
    </Providers>
  </body></html>;
}
