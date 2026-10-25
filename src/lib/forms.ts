// Envoie un formulaire au point de terminaison configuré, ou simule l'envoi s'il n'y en a pas.
export async function submitForm(endpoint: string, data: Record<string, unknown>): Promise<void> {
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    return
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Envoi refusé (${response.status})`)
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
