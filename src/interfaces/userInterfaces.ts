export interface User {
  id: number
  name: string
  work: string
  schedule: string
  photo: string[]
  email: string
  telephone: string
  start_date: string
  description: string
  state: 'ACTIVE' | 'INACTIVE'
  password: string
}
  export interface UsersState {
    data: User[]
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    error: string | null
  }
  
  export interface UsersTableProps {
  users: User[]
  handleRowClick: (id: number) => void
  handleSort: (key: keyof User) => void
  sortConfig: { key: keyof User; direction: 'asc' | 'desc' };
  onDelete: (id: number) => void
}