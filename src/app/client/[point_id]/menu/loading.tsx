import { MenuCategoriesSkeleton } from "@/components/ui/menu/skeletons/MenuCategoriesSkeleton";
export default function Loading() {
    return (
        <div className="flex flex-col gap-4">
            <MenuCategoriesSkeleton />
        </div>
    )
}