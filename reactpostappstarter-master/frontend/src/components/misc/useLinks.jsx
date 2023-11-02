import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import { useState, useEffect } from "react";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";
import { useMantineColorScheme, useComputedColorScheme, ActionIcon } from "@mantine/core";
import cx from 'clsx';
import { IconSun, IconMoon } from '@tabler/icons-react';''


export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  const items = !user
    ? [
        <NavLink onClick={handleClick} className={classes.link} end to="/">
          Home
        </NavLink>,
        <NavLink onClick={handleClick} className={classes.link} to="/login">
          Login
        </NavLink>,
        <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
        >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
      ]
    : [
        <NavLink onClick={handleClick} className={classes.link} end to="/posts">
          Posts
        </NavLink>,
        <NavLink onClick={handleClick} end to="/posts/create">
          Create
        </NavLink>,
        <NavLink onClick={() => handleClick(logoutService)} to="/">
          Logout
        </NavLink>,
      ];
  return [items];
};
