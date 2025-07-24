import LandingPage from '@/pages/LandingPage';

export default function Home() {
  return (
    <div className="font-sans min-h-screen grid grid-rows-[auto_1fr_auto] bg-white">
      {/* Main Content */}
      <main className="p-6 sm:p-12">
        <LandingPage />
      </main>
    </div>
  );
}
