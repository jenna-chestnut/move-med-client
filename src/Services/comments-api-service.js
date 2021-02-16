import mutableFetch from './mutable-fetch';
import TokenService from './token-service';

const CommentsService = {
  getComments(id) {
    return mutableFetch('comments', id, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  createComment(newComment, exc_id) {
    newComment = JSON.stringify(newComment);
    return mutableFetch('comments', exc_id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newComment
    })
  },
  updateComment(newData, exc_id) {
    newData = JSON.stringify(newData);
    return mutableFetch('comments', exc_id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newData
    })
  },
  deleteComment(comment_id) {
    return mutableFetch('comments', comment_id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    }, true)
  }
}

export default CommentsService;