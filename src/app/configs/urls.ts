import {environment} from "../../environments/environments.dev";

const {API} = environment;

const auth = `${API}/auth`
const posts = `${API}/posts`
const role = `${API}/role`
const users = `${API}/users`

const urls = {

  auth: {
    signup: `${auth}/signup`,
    login: `${auth}/login`,
    refresh: `${auth}/refresh`,
    logout: `${auth}/logout`,
  },
  posts: {
    url: posts,
  },
  role: {
    url: role,
  },
  user: {
    url: users,
    oneByParams: `${users}/onebyparams`,
    byToken: `${users}/bytoken`,
  },
};


export {
  urls,
};
