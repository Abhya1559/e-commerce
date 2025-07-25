import { clothData } from '@/constants/index';

export default function Body() {
  return (
    <div className="flex flex-col items-center justify-center px-6 sm:px-12">
      <h1 className="font-bold text-5xl text-center">Collections</h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {clothData.map((data) => (
          <div
            key={data.id}
            className="flex flex-col max-w-sm cursor-pointer transition-all transform hover:scale-105 bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-full">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {data.description}
              </p>
              <span className="font-bold hover:animate-bounce">
                $:{data.price}
              </span>
              <button className="mt-auto text-center  items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                Check Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
