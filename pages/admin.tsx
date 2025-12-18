import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminTable from '@/components/AdminTable';

export default function Admin() {

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
            Admin Paneli
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <AdminTable />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'az', ['common'])),
    },
  };
};

