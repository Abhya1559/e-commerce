import MovingHero from './MovingHero';
export default function HeroBanner() {
  return (
    <div className="item-center flex flex-col justify-center p-24">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* <h1 className="text-center text-3xl font-bold">Hello this is HeroBanner</h1> */}
        <MovingHero />
      </div>
    </div>
  );
}
