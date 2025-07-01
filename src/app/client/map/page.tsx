import MapPage from '@/components/ui/maps/mappy';

export default async function Page() {
// fake delay
await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <MapPage />
            </div>
        </div>
        </div>
    );
}