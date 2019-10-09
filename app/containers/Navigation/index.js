/* eslint-disable prettier/prettier */
/**
 *
 * Navigation
 *
 */
import { logoutAction } from './actions';
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  NAVIGATION_HEADER,
  SIDE_DRAWER_LIST,
  NAVIGATION_BREADCRUMB,
} from 'utils/constants';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
import AccountBox from '@material-ui/icons/AccountBox';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { makeSelectUser, makeSelectLocation } from 'containers/App/selectors';
import { Link } from 'react-router-dom';
import { isTemplateElement } from '@babel/types';
import Close from '@material-ui/icons/Close';
import saga from './saga';
import reducer from './reducer';
import './styles.scss';
import Logo from './images/header-logo.png';
import Avatar from './images/avatar.png';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export function Navigation({ userData, location, logout }) {
  useInjectReducer({ key: 'navigation', reducer });
  useInjectSaga({ key: 'navigation', saga });

  const baseLocation = `/${location.pathname.split('/')[1]}`;

  const [state, setState] = useState({
    left: false,
  });

  const showDropdown = () => {
    const subLocation = location.pathname.split('/')[2];
    return (
        <Select
          value={ subLocation ? ('Approver View') : ('Resource View') }
        >
          <MenuItem value={'Resource View'}><Link to="/timesheet" className="app-name">Resource View</Link></MenuItem>
          <MenuItem value={'Approver View'}><Link to="/timesheet/projectList" className="app-name">Approver View</Link></MenuItem>
        </Select>
 
    )
  }

  const sideList = (
    <div className="w-350">
      <Divider />
      <List className="p-20">
        {SIDE_DRAWER_LIST.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Link key={index} to={item.link} className="app-name">
            <ListItem button key={isTemplateElement.name} className="list-item">
              <ListItemIcon
                style={{
                  color: baseLocation === item.link ? '#428FD6' : '#2A2F33',
                }}
                className="icon-cl"
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    className={
                      baseLocation === item.link
                        ? 'sidebar-currentlocation-app'
                        : 'sidebar-app'
                    }
                  >
                    {item.name}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {/* <List className="p-20">
        {[
          { name: 'Paysquare', link: '/paysquare', icon: <Dashboard /> },
          { name: 'GreythHR', link: 'greythr', icon: <AccountBox /> },
        ].map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Link key={index} to={item.link} className="app-name">
            <ListItem button key={item.name} className="list-item">
              <ListItemIcon className="icon-cl">{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography>{item.name}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List> */}
      {/* <Divider /> */}
      <List className="p-20">
        {/* {['Logout'].map((text, index) => ( */}
        {/* // eslint-disable-next-line react/no-array-index-key */}
        <Link to="/" className="app-name"  onClick={logout}>
          <ListItem button className="list-item">
            <ListItemIcon className="icon-cl">{<ExitToApp />}</ListItemIcon>
            <ListItemText primary="Logout" className="sidebar-app"/>
          </ListItem>
        </Link>
        {/* //))} */}
      </List>
    </div>
  );
  return (
    <div>
      <div className="header-section">
        <AppBar position="static" color="default">
          <Toolbar className="nav-ht">
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={() => setState({ left: !state.left })}
              className="main-menu"
            >
              <MenuIcon />
            </IconButton>
            <div className="header-title">
              <img src={Logo} className="header-logo" alt="header-Logo" />
              <div className="nav-wrapper">
                <h1 className="page-title">
                  {NAVIGATION_HEADER[baseLocation]}
                </h1>
                <h2 className="breadcrumbs">
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="Breadcrumb"
                  >
                    {NAVIGATION_BREADCRUMB[location.pathname].name
                      .slice(
                        0,
                        NAVIGATION_BREADCRUMB[location.pathname].name.length -
                          1,
                      )
                      .map((item, index) => (
                        <Link
                          key={item}
                          to={
                            NAVIGATION_BREADCRUMB[location.pathname].links[
                              index
                            ]
                          }
                          className="breadcrumbs"
                        >
                          {item}
                        </Link>
                      ))}
                    <Typography className="breadcrumbs">
                      {
                        NAVIGATION_BREADCRUMB[location.pathname].name[
                          NAVIGATION_BREADCRUMB[location.pathname].name.length -
                            1
                        ]
                      }
                    </Typography>
                  </Breadcrumbs>
                </h2>
              </div>
            </div>
            {baseLocation === '/timesheet' ? showDropdown() : ''}
          </Toolbar>
        </AppBar>

        <Drawer
          open={state.left}
          onClose={() => setState({ left: !state.left })}
          className="sidebar"
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => setState({ left: !state.left })}
            onKeyDown={() => setState({ left: !state.left })}
          >
            <div className="profile-section">
              <img
                src={ (userData.thumbnail) ? userData.thumbnail : Avatar }
                className="avatar"
                alt="profile-pic"
              />
              <div>
                <h2 className="user-name">
                  {userData.name} <Close className="close-btn" />
                </h2>
                <p className="edit-profile">Edit Profile</p>
              </div>
            </div>
            {sideList}
          </div>
        </Drawer>
      </div>
    </div>
  );
}

Navigation.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  userData: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUser(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
    // dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Navigation);
