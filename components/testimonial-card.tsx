import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
}

export default function TestimonialCard({ name, role, content, rating }: TestimonialCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
            }`}
          />
        ))}
      </div>

      <p className="text-foreground text-base mb-4 italic">&quot;{content}&quot;</p>

      <div className="border-t border-border pt-4">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-muted-foreground text-sm">{role}</p>
      </div>
    </div>
  )
}
