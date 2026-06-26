export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="bg-gradient-to-r from-secondary to-secondary h-32"></div>
      <div className="p-6">
        <div className="h-6 bg-secondary rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-secondary rounded mb-2"></div>
        <div className="h-4 bg-secondary rounded mb-6 w-2/3"></div>
        <div className="h-10 bg-primary/20 rounded"></div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
