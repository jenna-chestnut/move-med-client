import './SubmitCommentForm.css';
import { useState} from 'react';

function SubmitCommentForm(props) {
  const [comment_text, setText] = useState('');
  const { comment, submitComment, closeForm } = props;
  const id = comment ? comment.id : null;

  return (
  <div className='SubmitCommentForm'>
    <form onSubmit={async (e) => {
      await submitComment(e, comment_text, comment ? true : false, id, () => closeForm());
      }
    }>

    <label htmlFor='add_note'>Comment:</label>
    <input type='text' id='add_note' name='add_note' defaultValue={comment ? comment.comment_text : comment_text} 
    onChange={(e) => setText(e.target.value)} required></input>

    <button type='submit'>{comment ? 'Update' : 'Submit'}</button>
    <button onClick={closeForm}>Cancel</button>
  </form></div>
  );
}

export default SubmitCommentForm;