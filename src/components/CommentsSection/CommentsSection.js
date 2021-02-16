import './CommentsSection.css';
import Comment from '../Comment/Comment';
import CommentsService from '../../Services/comments-api-service';
import { useState } from 'react';
import SubmitCommentForm from '../SubmitCommentForm/SubmitCommentForm';

function CommentsSection(props) {
  const { comments, exc_id, setComments } = props;
  const [error, setError] = useState(null);
  const [addingComment, setAdding] = useState(false);

  const submitComment = async (ev, comment_text, editing, commentId) => {
    ev.preventDefault();

    let commentData = {comment_text};
    let newComment; 

    try {
      if (editing) {
        newComment = await CommentsService.updateComment(commentData, commentId);
      }  
      else {
        newComment = await CommentsService.createComment(commentData, exc_id);
      }
      await setComments([...comments, newComment]);
    }
    catch (err) { setError(err.message) }
  }

  const deleteComment = async (ev, commentId) => {
    ev.preventDefault();
    if (window.confirm('Are you sure you want to delete this comment? This cannot be undone.')) {
    try {
        await CommentsService.deleteComment(commentId);
        const newComments = comments.filter(el => el.id !== commentId);
        await setComments(newComments);
    }
    catch (err) { setError(err.message) }
    }
  }

  const listComments = () => {
    return comments.map((el, idx) => {
      return <Comment key={`C${idx}`}
      comment={el} submitComment={submitComment} deleteComment={deleteComment}/>
    })
  }

  return (
    <div className='comments-section'>
      <div role='alert'>
          {error && <p>{error}</p>}
        </div>
    { addingComment ? 
    <SubmitCommentForm cancelForm={() => setAdding(false)} submitComment={submitComment} />
    : <button onClick={() => setAdding(true)}>Add Comment</button>
    }
    {listComments()}
    </div>
  )
}

export default CommentsSection;