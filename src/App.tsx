import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Footer, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Tooltip } from "flowbite-react";
import { BsGithub } from "react-icons/bs";
import { GrCodepen } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import UserList from "./components/UserList";
import logo from "./logo192.png"
import avatar from "./avatar.jpg";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar fluid rounded>
          <NavbarBrand href="./">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">My logo</span>
          </NavbarBrand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img={avatar} rounded />
              }
            >
            </Dropdown>
          </div>
        </Navbar>
      </div>
      <main className="container mx-auto mt-8">
        <UserList />
      </main>
      <Footer container className="container mx-auto">
        <div className="w-full flex items-center justify-between">
          <Tooltip content="profile" placement="bottom" animation="duration-500">
            <Footer.Copyright
              href="#"
              by="Ho Dang Thang"
              year={2024}
            />
          </Tooltip>
          <div className="flex items-center justify-between space-x-6">
            <Tooltip content="Github" className="tooltip" placement="bottom" animation="duration-500">
              <Footer.Icon
                href="#"
                icon={BsGithub}
              />
            </Tooltip>
            <Tooltip content="CodePen" className="tooltip" placement="bottom" animation="duration-500">
              <Footer.Icon
                href="#"
                icon={GrCodepen}
              />
            </Tooltip>
            <Tooltip content="LinkedIn" className="tooltip" placement="bottom" animation="duration-500">
              <Footer.Icon
                href="#"
                icon={FaLinkedin}
              />
            </Tooltip>
          </div>
        </div>
      </Footer>
    </>
  );
}

export default App;
