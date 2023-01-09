const URL_APP = 'https://awka-rent-app-production.up.railway.app'

export function urlSelector(url_path) {

  let url = (window.location.hostname.includes('localhost'))
    ? `http://localhost:3000${url_path}`
    : `https://${URL_APP}${url_path}`;

  return url;
};
