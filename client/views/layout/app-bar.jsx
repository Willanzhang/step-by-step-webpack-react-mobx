import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  }
}

class MainAppBar extends React.Component {
  constructor() {
    super()
    this.onHomeIconClick = this.onHomeIconClick.bind(this)
    this.createButtonClick = this.createButtonClick.bind(this)
    this.loginButtonClick = this.loginButtonClick.bind(this)
  }

  /* eslint-disable */
  onHomeIconClick() {

  }

  createButtonClick() {

  }

  loginButtonClick() {

  }
  /* eslint-enable */

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="secondary" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography className={classes.flex}>
              JNode
            </Typography>
            <Button raised="true" color="secondary" onClick={this.createButtonClick}>
              新建话题
            </Button>
            <Button color="secondary" onClick={this.loginButtonClick}>
              登陆
            </Button>
          </Toolbar>
        </AppBar>
      </div>)
  }
}
MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainAppBar)
