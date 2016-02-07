export function initialize(container, application) {
  application.inject('route', 'session', 'service:session');
  application.inject('controller', 'session', 'service:session');
  application.inject('component', 'session', 'service:session');

  application.inject('route', 'sessionUser', 'service:session-user');
  application.inject('controller', 'sessionUser', 'service:session-user');
  application.inject('component', 'sessionUser', 'service:session-user');
}

export default {
  name: 'session',
  initialize
};
