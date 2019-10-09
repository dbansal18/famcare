/**
 *
 * NewGroup
 *
 */

import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import groupLogo from './images/avatar.png';
import './styles.scss';
import { normalizeString } from './../../utils/helpingHand';
// import styled from 'styled-components';

function NewGroup({ groupsList, addNewGroup }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [groupName, setGroupName] = useState('');
  const [duplicateGroupName, setDuplicateGroupName] = useState(false);

  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
    setGroupName('');
    setImagePreview('');
    setFile('');
  }
  function submit() {
    addNewGroup({ groupName, file });
    // setAnchorEl(null);
    handleClose();
  }
  function handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const fileUploaded = e.target.files[0];

    reader.onloadend = () => {
      setFile(reader.result.split(',')[1]);
      // setFile(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(fileUploaded);
  }

  const checkForDuplicateGroup = name => {
    setGroupName(name);
    const isGroupExist = groupsList.find(
      grp => normalizeString(grp.name) === normalizeString(name),
    );
    setDuplicateGroupName(isGroupExist !== undefined);
  };

  return (
    <React.Fragment>
      <Tooltip title="Add Group">
        <Fab
          color="secondary"
          aria-describedby="Addbutton"
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
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
          <h2 className="title">Add New Group</h2>
            <div>
              <div className="grouplogosection">
                <img
                  src={imagePreview !== '' ? imagePreview : groupLogo}
                  className="grouplogo"
                  alt="uploadedimage"
                />
                <input
                  id="grouplogo"
                  className="fileInput"
                  type="file"
                  onChange={e => handleImageChange(e)}
                  style={{ display: 'none' }}
                  accept={'.jpg,.png'}
                />
                <label htmlFor="grouplogo">
                  <Typography className="changelogo">Change Logo</Typography>
                </label>
              </div>
              <h3 className="sub-title">Enter Croup Name</h3>
              <TextField
                id="outlined-name"
                placeholder="Group Name"
                margin="dense"
                variant="outlined"
                value={groupName}
                onChange={e => {
                  checkForDuplicateGroup(e.target.value);
                }}
              />
              {duplicateGroupName && (
                <FormHelperText id="component-error-text" className="error">
                  Duplicate group name
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
                groupName === ''  || duplicateGroupName
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

NewGroup.propTypes = {
  groupsList: PropTypes.array,
  addNewGroup: PropTypes.func,
};

export default NewGroup;
