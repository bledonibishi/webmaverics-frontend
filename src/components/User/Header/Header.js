import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import {
  faShoppingCart,
  faSearch,
  faArrowTurnDown,
} from '@fortawesome/free-solid-svg-icons';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import Logo from '../../../assets/images/logo.svg';
import Dropdown from '../../../ui/Dropdown';
import 'rc-dropdown/assets/index.css';
import './header.css';
const Header = () => {
  let selected = [];

  const saveSelected = ({ selectedKeys }) => {
    selected = selectedKeys;
  };

  const confirm = () => {
    console.log(selected);
    setVisible(false);
  };
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
  );
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
            <Dropdown
              buttonContent="Bledon ibishi"
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
    </nav>
  );
};

export default Header;
