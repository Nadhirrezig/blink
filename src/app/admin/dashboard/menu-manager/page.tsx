import { MainContent } from "@/components/ui/menu/main-content";
import { placeholderCategories, placeholderItem } from "@/lib/placeholder-data";
import AddNewItem from "@/components/ui/menu/addnewitem";

export default function MenuManager() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-4">
                {placeholderCategories.map((category) => {
                    const items = placeholderItem.filter(item => category.itemIds.includes(item.id));
                    return (
                        <div key={category.id} className="mb-8">
                            <h2 className="text-xl font-bold mb-4 capitalize text-center">{category.name}</h2>
                            <AddNewItem />
                            <MainContent
                                categories={[category]}
                                selectedCategory={category.id}
                                menuItems={items}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}