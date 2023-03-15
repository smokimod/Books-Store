import { Link } from 'react-router-dom';

import './status-field.scss';

export const StatusField = ({ path, head, title, text, previousStep, status, onSubmit }) => (
  <div className='status' data-test-id='status-block'>
    <h4>{head}</h4>
    <p>{title}</p>
    <Link to={path} onClick={status !== 400 && status ? onSubmit : previousStep}>
      <button type={status !== 400 && status ? 'submit' : 'button'}>{text}</button>
    </Link>
  </div>
);
