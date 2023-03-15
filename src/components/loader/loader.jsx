import './loader.scss';

export const Loader = ({ disabled }) => (
  <div className={`loader-container ${disabled}`} data-test-id='loader'>
    <div className='loader' />
  </div>
);
