export interface Database {
  public: {
    Tables: {
      babies: {
        Row: {
          id: string
          name: string
          birth_date: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          birth_date: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          birth_date?: string
          created_at?: string
        }
      }
      feeding_records: {
        Row: {
          id: string
          baby_id: string
          amount: number
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          baby_id: string
          amount: number
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          baby_id?: string
          amount?: number
          timestamp?: string
          created_at?: string
        }
      }
    }
  }
}
