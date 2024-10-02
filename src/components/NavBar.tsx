import React, { useContext, useState } from 'react'
import { useLocation, useNavigate, matchPath } from 'react-router-dom'
import { HiMenuAlt2 } from "react-icons/hi"
import { IoLogOutOutline, IoArrowBack } from "react-icons/io5"
import { AuthContext } from './authContext'
import ThemeToggleSwitch from './buttonNight'
import
  { TopBarContainer,
    IconButton,
    PageTitleContainer,
    PageTitle,
    ButtonGroup
  } from './NavBarStyles'

interface TopBarProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
}
const TopBar: React.FC<TopBarProps> = ({ toggleSidebar}) => {
  const location = useLocation()
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/rooms': 'Rooms',
    '/bookings': 'Bookings',
    '/contact': 'Contact',
    '/users': 'Users',
    '/bookings/new': 'New Booking',
    '/users/new': 'Add User',
  }

  const getPageTitle = () => {
    if (matchPath('/bookings/new', location.pathname)) {
      return 'New Booking'
    } else if (matchPath('/bookings/update/:id', location.pathname)) {
      return 'Update Booking'
    } else if (matchPath('/bookings/:id', location.pathname)) {
      return 'Booking Details'
    } else if (matchPath('/users/new', location.pathname)) {
      return 'Add User'
    } else if (matchPath('/users/edit/:id', location.pathname)) {
      return 'Edit User'
    } else if (matchPath('/users/:id', location.pathname)) {
      return 'User Details'
    } else {
      return pageTitles[location.pathname] || 'Unknown Page'
    }
  }

  const shouldShowBackButton = () => {
    return (
      matchPath('/bookings/:id', location.pathname) ||
      matchPath('/bookings/update/:id', location.pathname) ||
      matchPath('/bookings/new', location.pathname) ||
      matchPath('/users/edit/:id', location.pathname) ||
      matchPath('/users/new', location.pathname) ||
      matchPath('/users/:id', location.pathname)
    )
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
    document.body.style.backgroundColor = isDarkMode ? '#F7F7F7' : '#2D2D2D'
  }

  return (
    <TopBarContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={toggleSidebar}>
          <HiMenuAlt2 />
        </IconButton>
        <PageTitleContainer>
          {shouldShowBackButton() && (
            <IconButton onClick={handleBackClick}>
              <IoArrowBack />
            </IconButton>
          )}
          <PageTitle>{getPageTitle()}</PageTitle>
        </PageTitleContainer>
      </div>
      <ButtonGroup>
        <ThemeToggleSwitch isDarkMode={isDarkMode} onToggle={toggleTheme} />
        <IconButton onClick={handleLogout}>
          <IoLogOutOutline />
        </IconButton>
      </ButtonGroup>
    </TopBarContainer>
  )
}

export default TopBar
