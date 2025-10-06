import { Link } from 'react-router-dom'
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import { useAdminAuth } from '@/context/admin/AuthContext' // ✅ use the hook

const ProfileDropdown = () => {
  const { admin, logout } = useAdminAuth() // ✅ get admin + logout from context

  const handleLogout = async () => {
    await logout() // logout handles redirect itself
  }

  return (
    <Dropdown className="topbar-item" align="end">
      <DropdownToggle
        as="button"
        type="button"
        className="topbar-button content-none"
        id="page-header-user-dropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="d-flex align-items-center">
          <img
            className="rounded-circle"
            width={32}
            height={32}
            src={admin?.avatar || avatar1} // ✅ show real avatar if available
            alt={admin?.name || 'avatar'}
          />
        </span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownHeader as="h6">
          Welcome {admin?.name || 'Admin'}!
        </DropdownHeader>

        <DropdownItem as={Link} to="/apps/chat">
          <IconifyIcon
            icon="bx:message-dots"
            className="text-muted fs-18 align-middle me-1"
          />
          <span className="align-middle">Messages</span>
        </DropdownItem>

        <DropdownItem as={Link} to="/pages/aboutus">
          <IconifyIcon
            icon="bx:help-circle"
            className="text-muted fs-18 align-middle me-1"
          />
          <span className="align-middle">Help</span>
        </DropdownItem>

        <DropdownItem as={Link} to="/auth/lock-screen">
          <IconifyIcon
            icon="bx:lock"
            className="text-muted fs-18 align-middle me-1"
          />
          <span className="align-middle">Lock screen</span>
        </DropdownItem>

        <DropdownDivider className="dropdown-divider my-1" />

        <DropdownItem onClick={handleLogout} className="text-danger">
          <IconifyIcon
            icon="bx:log-out"
            className="fs-18 align-middle me-1"
          />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProfileDropdown
