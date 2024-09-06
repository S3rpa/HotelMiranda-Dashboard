import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsers, DeleteUser } from '../../../features/users/usersThunk'
import UsersTable from '../../components/UsersTable'
import Pagination from '../../components/Pagination'
import { FaPlus } from 'react-icons/fa'
import { RootState, AppDispatch } from '../../../app/store'
import { User } from '../../interfaces/userInterfaces'
import { Container, Header, NewUserButton, Tabs, Tab } from '../../components/userStyles'

const Users: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ACTIVE' | 'INACTIVE'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.data)
  const usersStatus = useSelector((state: RootState) => state.users.status)
  
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc',
  })

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(GetUsers())
    }
  }, [dispatch, usersStatus])

  const filteredUsers = users
    .filter((user: User) => filter === 'all' || user.state === filter)
    .filter((user: User) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.work.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telephone.includes(searchTerm)
    )
    .sort((a: User, b: User) => {
      const key = sortConfig.key
      const direction = sortConfig.direction === 'asc' ? 1 : -1
      return a[key] > b[key] ? direction : a[key] < b[key] ? -direction : 0
    })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )

  const handleRowClick = (id: number) => {
    navigate(`/users/${id}`)
  }

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(DeleteUser(userId)).then(() => {
        dispatch(GetUsers())
      })
    }
  }

  const handleCreate = () => {
    navigate('/users/new')
  }

  return (
    <Container>
      <Header>
        <NewUserButton onClick={handleCreate}>
          <FaPlus /> Add User
        </NewUserButton>
      </Header>
      <Tabs>
        <Tab $active={filter === 'all'} onClick={() => setFilter('all')}>
          All Users
        </Tab>
        <Tab $active={filter === 'ACTIVE'} onClick={() => setFilter('ACTIVE')}>
          Active Users
        </Tab>
        <Tab $active={filter === 'INACTIVE'} onClick={() => setFilter('INACTIVE')}>
          Inactive Users
        </Tab>
      </Tabs>
      <UsersTable
        users={currentUsers}
        handleRowClick={handleRowClick}
        handleSort={handleSort}
        sortConfig={sortConfig}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  )
}

export default Users
