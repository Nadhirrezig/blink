import MapPage from '@/components/ui/maps/mappy';
import { fetchProfiles } from '@/lib/data/profiles';

export default async function Page() {
    const profiles = await fetchProfiles();
    
    return (
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <MapPage profiles={profiles} />
            </div>
        </div>
        </div>
    );
}