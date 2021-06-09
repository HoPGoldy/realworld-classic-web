
export { default as Home } from './Home';
export { default as Login } from './Login';
export { default as Article } from './Article';
export { default as User } from './User';
export { default as EditArtcle } from './EditArtcle';
export { default as Profile } from './Profile';

// const files = require.context('.', false, /\.js$/)

// export default files.keys().reduce((modules, key) => {
//     if (key !== './index.js') {
//         modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default || files(key)
//     }

//     return modules;
// }, {})
  