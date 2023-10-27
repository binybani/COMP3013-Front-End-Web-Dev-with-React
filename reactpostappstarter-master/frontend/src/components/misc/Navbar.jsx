import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { useState } from 'react';
import { Container, Group, Burger, Button, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

const Navbar = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <>
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <MantineLogo size={28} />
    
        
        {/* <NavLink to="/">
        <h3 style={{ color: "black" }}>LOGO</h3>
        </NavLink> */}
     {/* <Group gap={5} visibleFrom="xs">
          {items}

        </Group> */}
        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */}
        <Group>
        <NavLink to="/">
          <h4>Home</h4> 
          </NavLink>
          {!!user && (
            <NavLink to="posts">
              {" "}
              <h4>Posts</h4>
            </NavLink>
          )}
          {!!user ? (
          <h4 className="logout" onClick={onLogout}>
              Logout
            </h4>
          ) : (
            <NavLink to="login">
              <h4>Login</h4>
            </NavLink>
          )}
        </Group>
      </Container>
    </header>
    </>
  );
};

export default Navbar;
