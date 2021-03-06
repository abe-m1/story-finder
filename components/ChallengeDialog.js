import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import ChallengeForm from '../components/ChallengeForm';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxWidth: '50%',
    maxHeight: '50%',
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ChallengeDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onSuccessSubmit = (data) => {
    this.props.onSuccessSubmit(data);
  };

  render() {
    const { classes, userId, user, challenge } = this.props;
    return (
      <Dialog
        open={this.props.addConnection}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Submit Challenge
            </Typography>
          </Toolbar>
        </AppBar>
        <ChallengeForm
          challenge={challenge}
          user={user}
          formId="new-connection-form"
          userId={userId}
          onSuccessSubmit={this.onSuccessSubmit}
          onboardStep={4}
          userForm={{ imagePreviewUrl: '' }}
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(ChallengeDialog);
