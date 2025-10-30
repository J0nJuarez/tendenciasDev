import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export type Props = {
  category: string
  onChange: (c: string) => void
  options: string[]
}

export function FiltroCategoria({ category, onChange, options }: Props) {
  return (
      <ButtonGroup className="mx-auto my-4 flex-row flex-nowrap justify-center">
        {options.map((opt) => (
            <Button
            key={opt}
            variant={category === opt ? "default" : "outline"}
            onClick={() => onChange(opt)}
            className="capitalize text-xs p-0.5 sm:px-5 sm:text-base"
            >
            {opt}
            </Button>
        ))}
      </ButtonGroup>
  )
}

export default FiltroCategoria
