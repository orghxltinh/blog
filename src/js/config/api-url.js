// window['__apiHostName__'] = typeof(__apiHostName__) === 'undefined' ? 'http://localhost/' : __apiHostName__;
// window['__apiPort__'] = typeof(__apiPort__) === 'undefined' ? 8080 : __apiPort__;
//
// window['__apiHostName__'] = __apiHostName__ || 'localhost';
// window['__apiPort__'] = __apiPort__ || 80;
const apiHost = `${__apiHostName__}:${__apiPort__}`;
console.debug('apiHost:', apiHost);
const restUrl = `${apiHost}/api`;
window.hxltinh = window.hxltinh || {};
window.hxltinh.apiUrl = {};
window.hxltinh.apiUrl.blogs = `${restUrl}/blogs`;
window.hxltinh.apiUrl.users = `${restUrl}/users`;
window.hxltinh.apiUrl.articles = `${restUrl}/articles`;
window.hxltinh.apiUrl.category = `${restUrl}/Categories`;
window.hxltinh.apiUrl.post = `${restUrl}/Posts`;
