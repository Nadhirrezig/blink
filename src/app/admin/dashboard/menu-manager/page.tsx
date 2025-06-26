import Menusectioncard from "@/components/menusectioncard";
import { placeholderItem } from "@/lib/placeholder-data";

export default function MenuManager() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-4">
                <Menusectioncard items={placeholderItem} sectionName="Coffee" />
                <Menusectioncard items={placeholderItem} sectionName="Food" />
                <Menusectioncard items={placeholderItem} sectionName="Drinks" />
            </div>
        </div>
    );
}