import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';


const Header = (({ goBack, name, classes, showStat, reload }) => (
  <AppBar position="static">
    <Toolbar className={classes.toolbar}>
      { goBack && (
        <IconButton color="inherit" onClick={goBack} className={classes.arrow}>
          <SettingsIcon />
        </IconButton>
      )}
      <Typography className={classes.title} variant="h6" color="inherit">
        {name}
      </Typography>
        <IconButton color="inherit" onClick={showStat} className={classes.arrow_right}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton color="inherit" onClick={reload} className={classes.arrow_semileft}>
          <RefreshOutlinedIcon />
        </IconButton>
    </Toolbar>
  </AppBar>
))

export default withStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  toolbar: {
    padding: 0,
    display: 'flex'
  },
  arrow: {
    position: 'absolute',
    left: 0, top: 0,
    height: '100%'
  },
  arrow_right: {
    position: 'absolute',
    right: 0, top: 0,
    height: '100%'
  },
  arrow_semileft: {
    position: 'absolute',
    left: '35px',
    top: 0,
    height: '100%'
  }
  
  
}))(Header)
