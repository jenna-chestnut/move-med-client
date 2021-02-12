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
  createComment(newComment) {
    newComment = JSON.stringify(newComment);
    return mutableFetch('comments', newComment.exercise_id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newComment
    })
  }
}

export default CommentsService;