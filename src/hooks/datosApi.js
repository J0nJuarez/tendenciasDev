import { useEffect, useState } from "react"

export function useJobData() {
  const [data, setData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLilIdoK17JTFEaU-j9RJa3q6JBjT0o8GQeAqElwqDRiEm-dwSqUh29PcypJXiS_IT4DlXfYAhQhNxOc4pkeGr-t9tv4iAUv_OGl5x_w2slbSraivrLLRb_blxZftiPJdE6u0Cl07oQqJWXtYbyXPrzEUBtxs0svbnw0JT-Aja8GuAzyxToWppRpt2Fl5OfVHjn9eR-LQJntzGtIBdmGVydzFJ2YgxtQCNEG95LhOXxtS5dcZwtO251wrk-ZjhGP8x9gA7fAu7VRDNe5mSWY_9ayJM5xVQ&lib=MPS2g1jHvAudqBIQl2GP-eswMa5svsu61")
        if (!res.ok) throw new Error("Error en la API")
        const json = await res.json()
        setData(json)

        const fechas = Object.keys(json)
        setSelectedDate(fechas[fechas.length - 1]) 
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    selectedDate,
    setSelectedDate,
    loading,
    error,
  }
}
