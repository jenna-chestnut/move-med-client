import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import SubmitCommentForm from '../SubmitCommentForm/SubmitCommentForm';
import './Comment.css';


function Comment(props) {
  const u = useSelector(selectUser);
  const { comment, submitComment, deleteComment } = props;
  const [editing, setEditing] = useState(false);

  const editComment = (
    <SubmitCommentForm comment={comment} 
    submitComment={submitComment} cancelForm={() => setEditing(false)} />
  )

  const regComment = (
  <div className='single-comment'>
  <span>{comment.comment_text}</span>
  <span> - {comment.full_name} </span>
  <span>Posted {new Date(comment.date_created).toLocaleString()}</span>
  { 
    comment.user_id === u.id &&
    <>
    <button onClick={(e) => { deleteComment(e, comment.id) }}>
      Delete
    </button>
    <button onClick={() => { setEditing(true) }}>
      Edit
    </button>
    </>
  }
  </div>
  )

  return editing 
  ? editComment
  : regComment;
}

export default Comment;