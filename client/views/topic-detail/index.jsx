import React, { Component } from 'react'
import Helmet from 'react-helmet'

export default class TopicDetail extends Component {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            this is details
          </title>
          <meta name="description" content="this is details888" />
        </Helmet>
        this is TopicDetail
      </div>
    )
  }
}
