import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
// import HomeIcon from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/core/styles'

import { topicPrimaryStyles, topicSecondaryStyles } from './styles'
import { tabs } from '../../util/variable-define'

const Primary = ({ topic, classes }) => {
  const classNames = cx({
    [classes.tab]: true,
    [classes.top]: topic.top
  })
  return (
    <div className={classes.root}>
      <span className={classNames}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  )
}

const Secondary = ({ topic, classes }) => (
  <span className={classes.root}>
    <span className={classes.userName}>{topic.author.loginname}</span>
    <span className={classes.count}>
      <span className={classes.accentColor}>{topic.reply_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间： {topic.create_at}</span>
  </span>
)

Primary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
}

Secondary.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
}

const StyledPrimary = withStyles(topicPrimaryStyles)(Primary)

const StyledSecondary = withStyles(topicSecondaryStyles)(Secondary)

const TopicListItem = ({ topic, onClick }) => (
  <List>
    {topic.map(list => (
      <ListItem key={list.id} button onClick={onClick}>
        <Avatar src={list.author.avatar_url} />
        <ListItemText
          primary={<StyledPrimary topic={list} />}
          secondary={<StyledSecondary topic={list} />}
        />
      </ListItem>
    ))}
  </List>
)

TopicListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  topic: PropTypes.array.isRequired
}

export default TopicListItem
