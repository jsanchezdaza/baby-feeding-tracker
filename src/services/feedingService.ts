import { supabase } from '../lib/supabase'
import type { FeedingRecord } from '../types/feeding'

export const createFeeding = async (feedingData: {
  babyId: string
  amount: number
  timestamp?: Date
}): Promise<FeedingRecord> => {
  const { data, error } = await supabase
    .from('feeding_records')
    .insert({
      baby_id: feedingData.babyId,
      amount: feedingData.amount,
      timestamp: feedingData.timestamp?.toISOString() || new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    babyId: data.baby_id,
    amount: data.amount,
    timestamp: new Date(data.timestamp)
  }
}

export const getFeedingsByBaby = async (babyId: string): Promise<FeedingRecord[]> => {
  const { data, error } = await supabase
    .from('feeding_records')
    .select('*')
    .eq('baby_id', babyId)
    .order('timestamp', { ascending: false })

  if (error) throw error

  return data.map((record) => ({
    id: record.id,
    babyId: record.baby_id,
    amount: record.amount,
    timestamp: new Date(record.timestamp)
  }))
}

export const deleteFeeding = async (id: string): Promise<void> => {
  const { error } = await supabase.from('feeding_records').delete().eq('id', id)

  if (error) throw error
}
