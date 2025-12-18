import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BannerSlider from '@/components/BannerSlider';
import { useTranslation } from 'next-i18next';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Banner Slider */}
        <BannerSlider />
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

