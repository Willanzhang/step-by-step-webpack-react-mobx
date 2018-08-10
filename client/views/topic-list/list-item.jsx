import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/core/styles'

import topicPrimaryStyles from './styles'

const Primary = ({ topic }) => (
  <div>
    <span>{topic.tab}</span>
    <span>{topic.title}</span>
  </div>
)

const StyledPrimary = withStyles(topicPrimaryStyles)(Primary)

const Secondary = ({ topic }) => (
  <span>
    <span>{topic.username}</span>
    <span>
      <span>{topic.replay_count}</span>
      <span>/</span>
      <span>{topic.visit_count}</span>
    </span>
    <span>创建时间： {topic.create_at}</span>
  </span>
)

Primary.propTypes = {
  topic: PropTypes.object.isRequired
}

Secondary.propTypes = {
  topic: PropTypes.object.isRequired
}


const TopicListItem = ({ topic, onClick }) => (
  <List>
    {topic.map(list => (
      <ListItem key={list.username} button onClick={onClick}>
        <HomeIcon />
        <ListItemText
          primary={<StyledPrimary topic={list} />}
          secondary={<Secondary topic={list} />}
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
