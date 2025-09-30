import { supabase } from '../lib/supabase'
import type { Baby } from '../types/baby'

export const createBaby = async (babyData: {
  name: string
  birthDate: Date
}): Promise<Baby> => {
  const { data, error } = await supabase
    .from('babies')
    .insert({
      name: babyData.name,
      birth_date: babyData.birthDate.toISOString().split('T')[0]
    } as any)
    .select()
    .single()

  if (error || !data) throw error || new Error('No data returned')

  return {
    id: (data as any).id,
    name: (data as any).name,
    birthDate: new Date((data as any).birth_date)
  }
}

export const getBabies = async (): Promise<Baby[]> => {
  const { data, error } = await supabase
    .from('babies')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) throw error || new Error('No data returned')

  return (data as any[]).map((baby: any) => ({
    id: baby.id,
    name: baby.name,
    birthDate: new Date(baby.birth_date)
  }))
}

export const updateBaby = async (
  id: string,
  updates: Partial<{ name: string; birthDate: Date }>
): Promise<Baby> => {
  const updateData: Record<string, string> = {}

  if (updates.name) updateData.name = updates.name
  if (updates.birthDate) {
    updateData.birth_date = updates.birthDate.toISOString().split('T')[0]
  }

  const { data, error } = await (supabase
    .from('babies') as any)
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) throw error || new Error('No data returned')

  return {
    id: (data as any).id,
    name: (data as any).name,
    birthDate: new Date((data as any).birth_date)
  }
}

export const deleteBaby = async (id: string): Promise<void> => {
  const { error } = await supabase.from('babies').delete().eq('id', id)

  if (error) throw error
}
