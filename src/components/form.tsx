"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres.")
    .max(32, "El título no puede superar los 32 caracteres."),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres.")
    .max(120, "La descripción no puede superar los 120 caracteres."),
})

export type BugFormValues = z.infer<typeof formSchema>

export function Formulariosugerencia({
  initialValues = { title: "", description: "" },
  showToast = true,
  className,
  submitLabel = "Enviar Sugerencia",
}: {
  initialValues?: Partial<BugFormValues>
  showToast?: boolean
  className?: string
  submitLabel?: string
}) {
  const form = useForm<BugFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues.title ?? "",
      description: initialValues.description ?? "",
    },
  })

  async function handleSubmit(data: BugFormValues) {
    try {
      const formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLScUBWx5mivpNhYPla7a0_fWTPSyR6I0BgUmtoalqnCHtadyzQ/formResponse"

      const formData = new FormData()
      // titulo
      formData.append("entry.1875965932", data.title)
      // descripcion
      formData.append("entry.1467397438", data.description)

      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      })

      form.reset()

      if (showToast) {
        toast.success("✅ Sugerencia enviada correctamente")
      }
    } catch (error) {
      console.error(error)
      toast.error("❌ Error al enviar la sugerencia")
    }
  }

  return (
    <Card className={`w-full h-full ${className ?? ""}`}>
      <CardHeader>
        <CardTitle>Enviar sugerencia</CardTitle>
        <CardDescription>
          Ayúdame a mejorar sugiriendo más tecnologías o informando de bugs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Asunto
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ej. Botón de filtro no funciona"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Descripción
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Describe el error y cómo reproducirlo."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 caracteres
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Sé lo más específico posible para poder solucionar el
                    problema o por qué se debería añadir una nueva tecnología.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" variant="outline" form="form-rhf-demo">
            {submitLabel}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

export default Formulariosugerencia
