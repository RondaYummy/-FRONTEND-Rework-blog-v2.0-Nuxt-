import Axios from 'axios';
import {
  backend
} from '../config/default.json';

const backendUri = `${backend.host}:${backend.port}/api`;

const baseConfig = {
  baseURL: `http://${process.env.NODE_ENV === 'production' ? backendUri : `${backend.devUri}`}`
};
const axios = Axios.create(baseConfig);

axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem('access');
  if (token) {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  }
  return config;
});

export default {
  login(v) {
    return axios.post('/signin', v).then((data) => {
      sessionStorage.setItem('access', data.data.updatedToken.accessToken);
      localStorage.setItem('refresh', data.data.updatedToken.refreshToken);
      return data;
    });
  },
  logout(id) {
    return axios.post('/logout', id);
  },
  register(v) {
    return axios.post('/registration', v).then(res => res.data);
  },
  getCurrentUser(id) {
    return axios.get(`/user/${id}`);
  },
  addpost(id, v) {
    return axios.post(`/user/${id}/posts`, v);
  },
  deletePost(id) {
    // TODO видаляти також всі коменти доробити
    return axios.delete(`/posts/${id}`);
  },
  editPost(description, id) {
    return axios.put(`/user/post/${id}`, {
      description
    })
  },
  addComment(idPost, v) {
    return axios.post(`/posts/${idPost}/comments`, v);
  },
  getUserPosts(id) {
    return axios.get(`/user/${id}/posts/`);
  },
  search(v) {
    return axios.get(`/user/search/${v}`);
  },
};
