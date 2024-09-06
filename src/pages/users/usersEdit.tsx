import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { EditUser } from '../../../features/users/usersThunk'
import { RootState, AppDispatch } from '../../../app/store'
import { User } from '../../interfaces/userInterfaces'
import { Container, Form, Input, Select, Button } from '../../components/userEditStyles'

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<User | null>(null)
  const users = useSelector((state: RootState) => state.users.data)

  useEffect(() => {
    const foundUser = users.find((u) => u.id === parseInt(id!))
    if (foundUser) {
      setUser({ ...foundUser })
    }
  }, [id, users])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    try {
      const resultAction = await dispatch(EditUser(user))
      unwrapResult(resultAction)
      alert('User updated successfully!')
      navigate('/users')
    } catch (error) {
      console.error('Failed to update user:', error)
      alert('Failed to update user.')
    }
  }

  if (!user && id) return <p>Loading...</p>

  return (
    <Container>
      <h1>{id ? 'Update User' : 'Create User'}</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={user?.name || ''}
          onChange={handleChange}
          placeholder="User Name"
          required
        />
        <Input
          type="text"
          name="work"
          value={user?.work || ''}
          onChange={handleChange}
          placeholder="Job Desk"
          required
        />
        <Input
          type="text"
          name="schedule"
          value={user?.schedule || ''}
          onChange={handleChange}
          placeholder="Schedule"
          required
        />
        <Input
          type="tel"
          name="telephone"
          value={user?.telephone || ''}
          onChange={handleChange}
          placeholder="Contact Number"
          required
        />
        <Input
          type="email"
          name="email"
          value={user?.email || ''}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <Input
          type="date"
          name="start_date"
          value={user?.start_date || ''}
          onChange={handleChange}
          placeholder="Start Date"
          required
        />
        <Input
          type="text"
          name="description"
          value={user?.description || ''}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <Input
          type="password"
          name="password"
          value={user?.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Select name="state" value={user?.state || 'ACTIVE'} onChange={handleChange} required>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </Select>
        <Button type="submit">{id ? 'Update User' : 'Create User'}</Button>
      </Form>
    </Container>
  )
}

export default UserEdit
