const getAction = (type: string) => {
  switch (type) {
    case 'WatchEvent':
      return 'started';
    case 'ForkEvent':
      return 'forked';
    case 'CreateEvent':
      return 'created a repository';
    case 'PublicEvent':
      return 'made public on';
    case 'PushEvent':
      return 'pushed to';
    default:
      return type.slice(0, -5).toLowerCase() + "ed"
  }
}

export {
  getAction as default
}
