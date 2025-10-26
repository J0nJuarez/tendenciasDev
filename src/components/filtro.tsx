import { Button } from "@/components/ui/button"

export type Props = {
  category: string
  onChange: (c: string) => void
  options: string[]
}

export function FiltroCategoria({ category, onChange, options }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <Button
          key={opt}
          variant={category === opt ? "default" : "outline"}
          onClick={() => onChange(opt)}
          className="capitalize"
        >
          {opt}
        </Button>
      ))}
    </div>
  )
}

export default FiltroCategoria
