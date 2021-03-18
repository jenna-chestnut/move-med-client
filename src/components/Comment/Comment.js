import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import SubmitCommentForm from '../SubmitCommentForm/SubmitCommentForm';
import './Comment.css';


function Comment(props) {
  const u = useSelector(selectUser);
  const { comment = {}, submitComment, deleteComment } = props;
  const [editing, setEditing] = useState(false);

  const closeForm = () => {
    setEditing(false);
  }

  const editComment = (
    <SubmitCommentForm comment={comment} 
    submitComment={submitComment} closeForm={closeForm} />
  )

  const regComment = (
  <div className='single-comment'>
  <p>{comment.comment_text}</p>
  <span> - {comment.full_name} </span>
  <span className='date'>Posted {new Date(comment.date_created).toLocaleString()}</span>
  { 
    comment.user_id === u._id &&
    <div className='comment-buttons'>
    <button onClick={(e) => { deleteComment(e, comment._id) }}>
      Delete
    </button>
    <button onClick={() => { setEditing(true) }}>
      Edit
    </button>
    </div>
  }
  </div>
  )

  return editing 
  ? editComment
  : regComment;
}

export default Comment;