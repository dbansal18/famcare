/**
 *
 * Dashboard
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { LinearProgress, Card, CardHeader, Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import NewGroup from 'components/NewGroup/Loadable';
import InviteUser from 'components/InviteUser/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from './../App/selectors';
import {
  makeSelectLoading,
  makeSelectUserList,
  makeSelectGroupList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getUserList, getGroupList, postGroup, inviteUser } from './actions';

import './styles.scss';
import Logo from './images/logo.png';

export function Dashboard({ loading, userList, groupList, getUsers, getGroups, loggedUser, addNewGroup, inviteUserToGroup }) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude)
      console.log('hhh', lat, lon)
    })
    // return function cleanup() {
    //   setLat(null);
    //   setLon(null);
    // };
  }, [lat, lon]);

  useEffect(() => {
    getGroups();
    getUsers();
  }, []);

  useEffect(() => {
    mapUserGroups();
  }, [groupList]);

  const mapUserGroups = () => {
    const tempUserGroups = [];
    groupList.forEach(group => {
      group.users.forEach(user => {
        if(user.id === loggedUser._id) tempUserGroups.push(group);
      })
    });
    setUserGroups(tempUserGroups);
  };

  function usersNotInGroup(groupUsers) {
    var tempUsers =  userList.filter(user => {
      if(!groupUsers.find(res => (res.id === user._id))) return user;
    });
    return tempUsers;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      { loading  ? <LinearProgress /> : ''}
      <div className="content-area area-height">
        <div className="page-404">
          <div className="ht-100 content">
            {/* <h1 className="main-heading">
              <div className="logo-center">
                <img className="logo-img" src={Logo} alt="JMITLogo" />
              </div>
            </h1> */}
            <h2>Add New Group {groupList.length}  {userGroups.length}
              <NewGroup
                groupsList={groupList}
                addNewGroup={addNewGroup}
              />
            </h2>
            <Link
              to={{
                pathname: '/mapp',
              }}
            >
              Map
            </Link>
            {
              ("geolocation" in navigator) ? 'hii' : 'nonnn'
            }
            <div>{lat}</div>
            <div>{lon}</div>
            {userGroups && userGroups.map(group => 
              (
                <div key={group._id} className="groupcard">
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        group.admin === loggedUser._id ? (<InviteUser
                            usersList={usersNotInGroup(group.users)}
                            selectedGroup={group._id}
                            addNewUser={inviteUserToGroup}
                          />) : ''
                      }
                      title={group.name}
                    />
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  loading: PropTypes.bool,
  userList: PropTypes.array,
  groupList: PropTypes.array,
  getUsers: PropTypes.func,
  getGroups: PropTypes.func,
  loggedUser: PropTypes.object,
  addNewGroup: PropTypes.func,
  inviteUserToGroup: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // dashboard: makeSelectDashboard(),
  loading: makeSelectLoading(),
  userList: makeSelectUserList(),
  groupList: makeSelectGroupList(),
  loggedUser: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUserList()),
    getGroups: () => dispatch(getGroupList()),
    addNewGroup: group => dispatch(postGroup(group)),
    inviteUserToGroup: invite => dispatch(inviteUser(invite)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
