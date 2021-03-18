import './CommentsSection.css';
import Comment from '../Comment/Comment';
import CommentsService from '../../Services/comments-api-service';
import { useState } from 'react';
import SubmitCommentForm from '../SubmitCommentForm/SubmitCommentForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

function CommentsSection(props) {
  const u = useSelector(selectUser);
  const { comments, exc_id, setComments } = props;
  const [error, setError] = useState(null);
  const [addingComment, setAdding] = useState(false);

  const submitComment = async (ev, comment_text, editing, commentId, closeForm) => {
    ev.preventDefault();

    let commentData = {comment_text};
    let newComment; 

    try {
      if (editing) {
        newComment = await CommentsService.updateComment(commentData, commentId);
        const newComments = comments.map(el => {
          return el._id === newComment._id 
          ?  {...newComment, full_name: u.name} 
          : el
        })
        await setComments(newComments);
      }  
      else {
        newComment = await CommentsService.createComment(commentData, exc_id);
        await setComments([...comments, {...newComment, full_name: u.name}]);
      }
      await closeForm();
    }
    catch (err) { setError(err.message) }
  }

  const deleteComment = async (ev, commentId) => {
    ev.preventDefault();
    if (window.confirm('Are you sure you want to delete this comment? This cannot be undone.')) {
    try {
        await CommentsService.deleteComment(commentId);
        const newComments = comments.filter(el => el._id !== commentId);
        await setComments(newComments);
    }
    catch (err) { setError(err.message) }
    }
  }

  const listComments = () => {
    return comments 
    ?
    comments.map((el, idx) => {
      return <Comment key={`C${idx}`}
      comment={el} submitComment={submitComment} deleteComment={deleteComment}/>
    }) : ''
  }

  return (
    <div className='comments-section'>
      <h3>COMMENTS</h3>
      <div role='alert'>
          {error && <p>{error}</p>}
        </div>
    {listComments()}

    { addingComment ? 
    <SubmitCommentForm closeForm={() => setAdding(false)} submitComment={submitComment} />
    : <button className='add-comment-button' onClick={() => setAdding(true)}>Add Comment</button>
    }

    </div>
  )
}

export default CommentsSection;