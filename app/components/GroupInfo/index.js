/**
 *
 * GroupInfo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.scss';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GroupInfo({groupName, users, onlineUsers, locations}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mapOpen, setMapOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isOnline = (user) => {
    var uu = onlineUsers.find(u => u.username == user)
    if(uu) return true;
    else return false
  }

  const showCoordinates = (user) => {
    const userLocation = locations.find(u => u.username == user)
    return userLocation;
  }

  const mapClose = () => setMapOpen(false);
  const openMap = () => setMapOpen(true);

  const mapUrl = (coordinates) => "https://google.com/maps?q="+coordinates.coords.lat+","+coordinates.coords.lon+"&t=&z=13&ie=UTF8&iwloc=&output=embed";

  const mapPopup = (coordinates) => (
    <Dialog onClose={mapClose} aria-labelledby="simple-dialog-title" open={mapOpen}>
      <DialogTitle id="simple-dialog-title">Location</DialogTitle>
      <iframe width="400" height="400" id="gmap_canvas" src={mapUrl(coordinates)} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
    </Dialog>
  )

  const showLocation = (coordinates) => coordinates ? (
    <p>
      Lat {coordinates.coords.lat}   Lon  {coordinates.coords.lon}
      <a onClick={openMap}>View</a>
      {mapPopup(coordinates)}
    </p>
  ) : ''

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className="group-name">
        {groupName}
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {groupName}
            </Typography>
            {/* <Button color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List>
          {users.map(user => (
            <div key={user.id}>
              <ListItem button>
                { isOnline(user.email) ? (<Badge color="secondary" variant="dot" />) : ''}
                <ListItemText primary={user.name} secondary={user.email} />
                { showLocation(showCoordinates(user.email)) }
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

GroupInfo.propTypes = {
  groupName: PropTypes.string,
  users: PropTypes.array,
  onlineUsers: PropTypes.array,
  locations: PropTypes.array,
};

export default memo(GroupInfo);