import { Nunito } from 'next/font/google';

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';
import './globals.css';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import { QueryProvider } from './providers/query.provider';
import FilterModal from './components/modals/FilterModal';
export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <QueryProvider>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <FilterModal />
            <RentModal />
            <Navbar />
          </ClientOnly>
          <div className='pb-20 pt-28'>{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
