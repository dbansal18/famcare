/**
 *
 * InviteUser
 *
 */

import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import './styles.scss';
import { normalizeString } from './../../utils/helpingHand';
// import styled from 'styled-components';

function InviteUser({ usersList, selectedGroup, addNewUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
    setEmail('');
  }
  function submit() {
    addNewUser({ email: email, group: selectedGroup });
    // setAnchorEl(null);
    handleClose();
  }

  const checkEmail = name => {
    setEmail(name);
    const isEmailExist =usersList.find(
      user => normalizeString(user.email) === normalizeString(name),
    );
    setEmailValid((isEmailExist === undefined) ? true : false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Add User">
        {/* <Fab
          color="secondary"
          aria-describedby="Addbutton"
          onClick={handleClick}
        >
          <AddIcon />
        </Fab> */}
        <Button onClick={handleClick} color="secondary">Add User</Button>
      </Tooltip>
      <Popover
        id={open ? 'simple-popover' : null}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="add-new-wrapper">
          <h2 className="title">Add User</h2>
            <div>
              <h3 className="sub-title">Enter User Email</h3>
              <TextField
                id="outlined-name"
                placeholder="Group Name"
                margin="dense"
                variant="outlined"
                value={email}
                onChange={e => {
                  checkEmail(e.target.value);
                }}
              />
              {emailValid && (
                <FormHelperText id="component-error-text" className="error">
                  User does not exists or already in group
                </FormHelperText>
              )}
            </div>
          <div className="action-wrapper">
            <Button
              variant="outlined"
              className="act-btn-l"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="act-btn-r"
              disabled = {
                email === ''  || emailValid
              }
              onClick={submit}
            >
              Add
            </Button>
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
}

InviteUser.propTypes = {
  usersList: PropTypes.array,
  selectedGroup: PropTypes.string,
  addNewUser: PropTypes.func,
};

export default InviteUser;
