import Image from 'next/image';
import { MenuItem } from '@/lib/definitions';
import AddNewItem from '@/components/ui/addnewitem';
interface MenusectioncardProps {
  items: MenuItem[];
  sectionName: string;
}

export default function Menusectioncard({ items, sectionName }: MenusectioncardProps) {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h2 className="text-xl font-bold mb-4 capitalize">{sectionName}</h2>    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AddNewItem />
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center rounded-xl bg-[#f8f8f8] p-4 shadow-sm hover:shadow-md cursor-pointer transition duration-200 ease-in-out"
            >
              <div className="relative w-20 h-20 mb-2">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 capitalize">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
