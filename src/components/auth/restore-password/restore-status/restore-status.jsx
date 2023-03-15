import { Link } from 'react-router-dom';

import '../../status-field/status-field.scss';

export const RestoreStatus = ({ path, head, title, text, onSubmit }) => (
  <div className='status' data-test-id='status-block'>
    <h4>{head}</h4>
    <p>{title}</p>
    <Link to={path} onClick={onSubmit}>
      <button type='submit'>{text}</button>
    </Link>
  </div>
);
