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
    } as any)
    .select()
    .single()

  if (error || !data) throw error || new Error('No data returned')

  return {
    id: (data as any).id,
    babyId: (data as any).baby_id,
    amount: (data as any).amount,
    timestamp: new Date((data as any).timestamp)
  }
}

export const getFeedingsByBaby = async (babyId: string): Promise<FeedingRecord[]> => {
  const { data, error } = await supabase
    .from('feeding_records')
    .select('*')
    .eq('baby_id', babyId)
    .order('timestamp', { ascending: false })

  if (error || !data) throw error || new Error('No data returned')

  return (data as any[]).map((record: any) => ({
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
