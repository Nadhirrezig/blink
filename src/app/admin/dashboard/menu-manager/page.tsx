import { MainContent } from "@/components/ui/menu/main-content";
import { placeholderProfiles } from "@/lib/placeholder-data";
import { Category } from "@/lib/definitions";
import AddNewItem from "@/components/ui/menu/addnewitem";

export default function MenuManager() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-4">
                {placeholderProfiles.map((profile) => (
                    <div key={profile.profileId} className="mb-8">
                        <h1 className="text-2xl font-bold mb-6 text-center text-[#EEA4CE]">
                            {profile.name}
                        </h1>
                        {profile.menu.map((category: Category) => (
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
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}