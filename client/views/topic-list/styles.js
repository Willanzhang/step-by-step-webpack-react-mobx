export const topicPrimaryStyles = (theme) => ({
  root: {
    display: 'flex',
    alginItems: 'center'
  },
  title: {
    color: '#555'
  },
  tab: {
    backgroundColor: theme.palette.primary[500],
    textAlign: 'center',
    display: 'inline-block',
    padding: '0 6px',
    color: '#fff',
    borderRaduis: 3,
    marginRight: 10,
    fontSize: '12px'
  },
  top: {
    backgroundColor: theme.palette.secondary[500]
  }
})

export const topicSecondaryStyles = (theme) => ({
  root: {
    display: 'flex',
    alginItems: 'center',
    paddingTop: 3
  },
  count: {
    textAlign: 'center',
    marginRight: 20
  },
  userName: {
    color: '#9e9e9e',
    marginRight: 20
  },
  accentColor: {
    color: theme.palette.secondary[300]
  }
})
