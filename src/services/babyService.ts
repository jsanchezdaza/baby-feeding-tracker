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
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    name: data.name,
    birthDate: new Date(data.birth_date)
  }
}

export const getBabies = async (): Promise<Baby[]> => {
  const { data, error } = await supabase
    .from('babies')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map((baby) => ({
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

  const { data, error } = await supabase
    .from('babies')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    name: data.name,
    birthDate: new Date(data.birth_date)
  }
}

export const deleteBaby = async (id: string): Promise<void> => {
  const { error } = await supabase.from('babies').delete().eq('id', id)

  if (error) throw error
}
