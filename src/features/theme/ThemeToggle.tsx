import React from 'react';
import { toggleTheme } from './themeSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../components/store';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useAppSelector(state => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return <button onClick={handleToggle}>Toggle to {theme === 'light' ? 'Dark' : 'Light'}</button>;
};

export default ThemeToggle;
