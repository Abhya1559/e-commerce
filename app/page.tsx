import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex  flex-col item-center justify-center p-24">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-center font-bold text-3xl">
          Hello this is beginning of my e-commerce app
        </h1>
        <Button variant={"outline"} className="cursor-pointer">
          Hello I am working properly
        </Button>
      </div>
    </div>
  );
}
