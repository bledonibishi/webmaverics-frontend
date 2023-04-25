import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import {
  faShoppingCart,
  faSearch,
  faArrowTurnDown,
} from '@fortawesome/free-solid-svg-icons'
import {
  InputGroup,
  InputGroupText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Form,
  Button,
} from 'reactstrap'
import Logo from '../../../assets/images/logo.svg'
import Dropdown from '../../../ui/Dropdown'
import 'rc-dropdown/assets/index.css'
import './header.css'
import { useState } from 'react'
import CustomModal from '../modal/CustomModal'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../api/axiosInstance'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import {
  fetchCountries,
  logout,
  userLogin,
} from '../../../store/auth/authSlice'
import { useEffect } from 'react'
import { useHistory, useNavigate } from 'react-router-dom'
// import { axiosInstance } from '../../../api/axiosInstance';
const Header = (props) => {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.auth)
  console.log('userState', userState)
  const [loginModal, setLoginModal] = useState(false)
  const [user, setUser] = useState({})
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  console.log('user', user)

  let selected = []

  const saveSelected = ({ selectedKeys }) => {
    selected = selectedKeys
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const confirm = () => {
    console.log(selected)
    setVisible(false)
  }
  const menu = (
    <Menu
      style={{ width: 180 }}
      multiple
      onSelect={saveSelected}
      onDeselect={saveSelected}
      className="col"
    >
      <MenuItem key="1">one</MenuItem>
      <MenuItem key="2">two</MenuItem>
      <Divider />
      <MenuItem key="3">
        <a href onClick={dispatch(logout())}>
          Logout
        </a>
      </MenuItem>
      <MenuItem disabled>
        <button
          style={{
            cursor: 'pointer',
            color: '#000',
            pointerEvents: 'visible',
            boxShadow: '0 4px 10px -4px #aaa',
            borderRadius: '3px',
            background: '#1d1d1d',
            color: '#fff',
            border: 'none',
            padding: '6px 14px',
          }}
          onClick={confirm}
        >
          Order now
        </button>
      </MenuItem>
    </Menu>
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axiosPrivate.post('api/v1/users/login', user)
      dispatch(userLogin())
      const token = response.data.token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setLoginModal(false)
      navigate('/signup')
      // Handle successful login response
    } catch (error) {
      console.log(error)
      // Handle login error
    }
  }

  const toggleModal = () => {
    setLoginModal((state) => !state)
  }
  return (
    <nav className="">
      <div className="header-container">
        <div className="container d-flex header-div">
          <div className="logo-header__div">
            <a href="/">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <div className="w-50">
            <InputGroup>
              <Input
                placeholder="username"
                // className="text-light"
                style={{
                  background: '#444',
                  color: '#fff',
                  border: 'none',
                }}
              />
              <InputGroupText
                addonType="append"
                className="border-none"
                style={{ background: '#444', border: 'none' }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: '5px', color: '#fff' }}
                />
              </InputGroupText>
            </InputGroup>
            <span
              style={{ width: '30px', height: '30px', backgroundColor: 'blue' }}
            ></span>
          </div>

          <div className="d-flex p-4 align-items-center">
            {userState.user ? (
              <>
                <Dropdown
                  buttonContent={
                    userState.user.name + ' ' + userState.user.surname
                  }
                  icon={<FontAwesomeIcon icon={faArrowTurnDown} />}
                  menu={menu}
                  placement="bottomRight"
                />
                <div
                  className="p-3"
                  style={{
                    borderLeft: '1px solid white',
                    cursor: 'pointer',
                    borderRight: '1px solid white',
                  }}
                >
                  <div>
                    <Dropdown menu={menu} placement="bottomRight">
                      <FontAwesomeIcon
                        className="p-1"
                        icon={faShoppingCart}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </Dropdown>
                  </div>
                </div>
              </>
            ) : (
              <a
                href
                onClick={() => setLoginModal(true)}
                style={{ color: 'white' }}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
      <div
        className="bg-light"
        style={{
          height: '60px',
          boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ul className="container d-flex list-container align-items-center h-100 list-unstyled justify-content-evenly">
          <li>
            <a href="">Kompjuter,laptop & server</a>
          </li>
          <li>
            <a href="">Celular,tablet & navigim</a>
          </li>
          <li>
            <a href="">TV,audio & foto</a>
          </li>
          <li>
            <a href="">Gaming</a>
          </li>
          <li>
            <a href="">SMART</a>
          </li>
          <li>
            <a href="">Aksesore</a>
          </li>
          <li>
            <a href="">Pjese per kompjutere</a>
          </li>
          <li>
            <a href="">Outlet</a>
          </li>
          <li>
            <a href="">Qka ka tre?</a>
          </li>
        </ul>
      </div>

      {loginModal && (
        <CustomModal
          isOpen={loginModal}
          toggle={toggleModal}
          size="md"
          title="Login"
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <Button type="submit">Login</Button>
            <p>
              Dont have an account? <a href="/signup">Signup</a>
            </p>
          </Form>
        </CustomModal>
      )}
    </nav>
  )
}

export default Header
