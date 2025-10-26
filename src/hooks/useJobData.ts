import { useEffect, useState } from "react"

type TechData = { tecnologia: string; ofertas: number | string }

export type MarketData = Record<
  string,
  {
    frontend: TechData[]
    backend: TechData[]
    lenguajes: TechData[]
    ecosistema: TechData[]
  }
>

export function useJobData(url = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLi_fFSI9zdzCl_FF9kOmwLoz4MMGfwqSdUXnxJpxgbuuOxRqy_UVn7pDlbrvwJq9yI0TQR8S4AsGhnaeZBe7GDGf03PaIa5b7hbJkdEt63yy-4ksqEd8A5Vy8c2xScw-4VoxUeMcN3_ZarAhEqSmDZ8QtncylTxIDKr_CKNSUyNH701RbvNez7O7elecPO5glCtEsBk3PHc4nbocF7dQiPyNwfPKOjFZpvBD_Dqj_c4dmU3YJtm_QD1cxuBNZR1maxGT9NHAhcYVbd-z63R243mNz7qlA&lib=MPS2g1jHvAudqBIQl2GP-eswMa5svsu61") {
  const [data, setData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(url)
        if (!res.ok) throw new Error("Error al cargar los datos del mercado")
        const json: MarketData = await res.json()
        setData(json)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, isLoading, error }
}
