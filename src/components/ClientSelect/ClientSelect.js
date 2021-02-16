
import './ClientSelect.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, setUsers } from '../../features/admin/adminSlice';
import { useEffect } from 'react';
import ClientsService from '../../Services/client-api-service';
import AdminService from '../../Services/admin-api-service';
import { setError } from '../../features/appError/appErrorSlice';

function ClientSelect(props) {
  const clients = useSelector(selectUsers);
  const dispatch = useDispatch();
  const { setClient, admin } = props;

  useEffect(() => {
    const getClients = async () => {
      try {
        if (!clients.length) {
        const c = admin ?
        await AdminService.getUsers()
        : await ClientsService.getClients();
        
        await dispatch(setUsers(c));
        }
      } catch (err) { setError(err) };
    }
    getClients();
  })

  const renderOptions = () => {
   const options = clients ? clients.map((el, idx) => {
    if (!el.is_admin && !el.is_provider)
    return <option key={`cso${idx}`} value={el.id}>
      { el.full_name }
    </option>
    else return '';
   }) : '';

   if (clients) return (
    <select name='clients' id='clients' onChange={(e) => { if (e.target.value !== 'not!') setClient(e.target.value) }}>
      <option key='fake-item' value='not!'>Select Client..</option>
      {options}
    </select>
   )
  }

    return renderOptions();
}

export default ClientSelect;