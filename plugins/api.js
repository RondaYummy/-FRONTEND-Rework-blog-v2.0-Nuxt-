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
      // TODO записую
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
  addToFavorite(id) {
    return axios.post(`/user/${id}/favorite`);
  },
  deleteFromFavorite(id) {
    return axios.delete(`/user/${id}/favorite`);
  },
  addToFriends(id) {
    return axios.post(`/user/${id}/friends`);
  },
  AcceptFriend(id) {
    return axios.post(`/user/friends/accept/${id}`);
  },
  cancelFriendRequest(id) {
    return axios.post(`/user/friends/cancel/${id}`);
  },
  rejectFriendRequest(id) {
    return axios.post(`/user/friends/reject/${id}`);
  },
  applicationsToFriends(v) {
    return axios.get(`/user/friend-requests?${v}`);
  },
  deleteFriend(id) {
    return axios.delete(`/user/friends/${id}/remove`)
  },
  addpost(id, v) {
    return axios.post(`/user/${id}/posts`, v);
  },
  deletePost(id) {
    return axios.delete(`/posts/${id}`);
  },
  editPost(id, v) {
    return axios.put(`/user/post/${id}`, v);
  },
  addComment(idPost, v) {
    return axios.post(`/posts/${idPost}/comments`, v);
  },
  getPostComments(postId) {
    return axios.get(`/posts/${postId}/comments/`);
  },
  editComment(id, v) {
    return axios.put(`/user/${id}/comment`, v);
  },
  deleteComment(id) {
    return axios.delete(`/posts/${id}/comment`);
  },
  getUserPosts(id) {
    return axios.get(`/user/${id}/posts/`);
  },
  search(v) {
    return axios.get(`/user/search/${v}`);
  },
};
