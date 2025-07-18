import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../components/store';
import { logout } from '../../components/store/authSlice';
import { useNavigate } from 'react-router-dom';
import userManagementLogo from '../../assists/users.png';
import './styles/header.scss';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="headerWrapper">
      <div>
        <img src={userManagementLogo} alt="user Management" />
        <div>
          <div>Kaviarasu N</div>
          <LogoutOutlined onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};
export default Header;
