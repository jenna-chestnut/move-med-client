import './SubmitCommentForm.css';
import { useState} from 'react';

function SubmitCommentForm(props) {
  const [comment_text, setText] = useState('');
  const { comment, submitComment, cancelForm } = props;
  const id = comment ? comment.id : null;

  return (
  <div className='SubmitCommentForm'>
    <form onSubmit={(e) => submitComment(e, comment_text, comment ? true : false, id )}>

    <label htmlFor='add_note'>Comment:</label>
    <input type='text' id='add_note' name='add_note' defaultValue={comment ? comment.comment_text : comment_text} 
    onChange={(e) => setText(e.target.value)} required></input>

    <button type='submit'>{comment ? 'Update' : 'Submit'}</button>
    <button onClick={() => cancelForm()}>Cancel</button>
  </form></div>
  );
}

export default SubmitCommentForm;