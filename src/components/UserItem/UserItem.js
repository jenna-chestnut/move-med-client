import { Link } from 'react-router-dom';
import './UserItem.css';

function UserItem(props) {
  const { u = {} } = props;

  const link = !u.is_admin && !u.is_provider
  ? `/view/clients/${u.id}` : `/view/users/${u.id}`;

    return (
      <div className="user-item">
        <h4>
          <Link to={link}>
            {u.full_name}
          </Link>
        </h4>
      </div>
    );
}

export default UserItem;