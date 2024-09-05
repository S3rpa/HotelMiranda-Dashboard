export interface Contact {
    Contact_id: number
    Date: string
    Customer: string
    Comment: string
    gender: string
    ip_address: string
    status?: 'published' | 'archived' | null | undefined
  }
  export interface ContactState {
    data: Contact[]
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: string | null
  }