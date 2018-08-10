import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

// import Toolbar from '@material-ui/core/Toolbar'
// import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from '@material-ui/icons/Home'
// import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    margin: 24,
    marginTop: 80
  }
}

const Container = ({ classes, children }) => (
  <Paper className={classes.root} elevation={4}>
    {children}
  </Paper>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}

export default withStyles(styles)(Container)
