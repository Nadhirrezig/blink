import { MainContent } from "@/components/ui/menu/main-content";
import { placeholderProfiles } from "@/lib/placeholder-data";
import { Category } from "@/lib/definitions";
import AddNewItem from "@/components/ui/menu/addnewitem";

export default function MenuManager() {
    // Use the first profile's menu categories as placeholder
    const placeholderCategories: Category[] = placeholderProfiles[0].menu;
    
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-4">
                {placeholderCategories.map((category: Category) => {
                    return (
                        <div key={category.catId} className="mb-8">
                            <h2 className="text-xl font-bold mb-4 capitalize text-center">{category.name}</h2>
                            <AddNewItem />
                            <MainContent
                                key={category.catId}
                                categories={[category]}
                                selectedCategory={category.catId}
                                menuItems={category.items}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}