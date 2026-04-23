import { skBlock, skLineStrong } from "@/components/skeletons/skeleton-primitives";

/**
 * Inner layout matching `ProofCockpit`: nav card, 5+7 column hero, proof panel block.
 * Shared by hero dynamic fallback and route-level loading.
 */
export function CockpitStageSkeleton() {
  return (
    <>
      <div className="mb-8 min-w-0 rounded-2xl border border-border/80 bg-card-muted/35 p-3 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-card-muted/25 md:p-4">
        <div className={`mb-2.5 h-2.5 w-28 ${skLineStrong}`} />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-9 w-24 rounded-xl md:h-10 md:w-28 ${skBlock}`} />
          ))}
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 space-y-5 lg:col-span-5">
          <div className="flex gap-5">
            <div className={`h-[4.5rem] w-[4.5rem] shrink-0 rounded-xl md:h-20 md:w-20 ${skBlock}`} />
            <div className="min-w-0 flex-1 space-y-2 pt-0.5">
              <div className={`h-2.5 w-36 ${skLineStrong}`} />
              <div className={`h-9 w-full max-w-md md:h-11 ${skBlock}`} />
            </div>
          </div>
          <div className="space-y-2">
            <div className={`h-3.5 w-full ${skBlock}`} />
            <div className={`h-3.5 w-full ${skBlock}`} />
            <div className={`h-3.5 w-full max-w-lg ${skBlock}`} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-7 w-[4.5rem] rounded-full md:w-24 ${skBlock}`} />
            ))}
          </div>
          <div className={`h-2.5 w-40 ${skLineStrong}`} />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-9 min-w-[5.5rem] rounded-lg px-2 md:min-w-[6rem] ${skBlock}`} />
            ))}
          </div>
          <div className={`h-2.5 w-36 ${skLineStrong}`} />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-8 w-24 rounded-lg md:w-28 ${skBlock}`} />
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card-muted/40 p-4">
            <div className={`mb-2 h-2.5 w-28 ${skLineStrong}`} />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-3.5 w-full ${skBlock}`} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className={`h-10 w-36 rounded-full ${skBlock}`} />
            <div className={`h-10 w-36 rounded-full ${skBlock}`} />
          </div>
          <div className={`h-3 w-48 ${skBlock}`} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-col lg:col-span-7 lg:min-h-[min(640px,80svh)]">
          <div className={`mb-3 h-2.5 w-32 ${skLineStrong}`} />
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className={`min-h-[min(280px,45svh)] flex-1 rounded-xl border border-border bg-card-muted/30 ${skBlock}`} />
            <div className={`h-14 w-full shrink-0 rounded-lg ${skBlock}`} />
          </div>
        </div>
      </div>
    </>
  );
}
