import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {

  return (
    <div className="NotFound">     
    <h2>404</h2>
    <h3>Page not found</h3>
    <Link to='/'>Go to homepage</Link>
    </div>
  );
}

export default NotFound;