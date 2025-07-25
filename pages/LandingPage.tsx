import Body from '@/components/LandingPage/Body';
import Hero from '@/components/LandingPage/Hero';
import NewsLetter from '@/components/LandingPage/newsLetter';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Body />
      <NewsLetter />
    </main>
  );
}
