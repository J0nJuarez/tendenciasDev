import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export type Props = {
  category: string
  onChange: (c: string) => void
  options: string[]
}

export function FiltroCategoria({ category, onChange, options }: Props) {
  return (
      <ButtonGroup className="mx-auto my-4 flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-0 [&>*]:w-full sm:[&>*]:w-auto">
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
      </ButtonGroup>
  )
}

export default FiltroCategoria
