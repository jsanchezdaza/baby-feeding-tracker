import { supabase } from '../lib/supabase'
import type { FeedingRecord } from '../types/feeding'
import type { Database } from '../types/database.types'

type FeedingRow = Database['public']['Tables']['feeding_records']['Row']

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
    } as unknown as FeedingRow)
    .select()
    .single()

  if (error || !data) throw error || new Error('No data returned')

  const feeding = data as unknown as FeedingRow

  return {
    id: feeding.id,
    babyId: feeding.baby_id,
    amount: feeding.amount,
    timestamp: new Date(feeding.timestamp)
  }
}

export const getFeedingsByBaby = async (babyId: string): Promise<FeedingRecord[]> => {
  const { data, error } = await supabase
    .from('feeding_records')
    .select('*')
    .eq('baby_id', babyId)
    .order('timestamp', { ascending: false })

  if (error || !data) throw error || new Error('No data returned')

  return (data as unknown as FeedingRow[]).map((record) => ({
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
