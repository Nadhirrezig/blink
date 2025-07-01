
import { MenuItemsSkeleton } from "@/components/ui/menu/skeletons/MenuItemsSkeleton";
export default function Loading() {
    return (
        <div className="flex flex-col gap-4 pt-4 px-4 pb-20">
            <MenuItemsSkeleton />
        </div>
    );
}