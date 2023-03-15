import { useSelector } from 'react-redux';

import './additional-info-book.scss';

export const AdditionalInfoBook = () => {
  const currentBook = useSelector((state) => state.books.currentBook);
  const { issueYear, publish, pages, cover, weight, format, ISBN, producer, categories } = currentBook;

  return (
    <div className='additionalInfo'>
      <h5>Подробная информация</h5>
      <div className='table-info'>
        <div className='tableOne'>
          <table>
            <tbody>
              <tr>
                <th className='th-head'>Издательство</th>
                <td>{publish}</td>
              </tr>
              <tr>
                <th className='th-head'>Год издания</th>
                <td>{issueYear}</td>
              </tr>
              <tr>
                <th className='th-head'>Страниц</th>
                <td>{pages}</td>
              </tr>
              <tr>
                <th className='th-head'>Переплёт</th>
                <td>{cover}</td>
              </tr>
              <tr>
                <th className='th-head'>Формат</th>
                <td>{format}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='tableTwo'>
          <table>
            <tbody>
              <tr>
                <th className='th-head'>Жанр</th>
                <td>{categories}</td>
              </tr>
              <tr>
                <th className='th-head'>Вес</th>
                <td>{weight}</td>
              </tr>
              <tr>
                <th className='th-head'>ISBN</th>
                <td>{ISBN}</td>
              </tr>
              <tr>
                <th className='th-head'>Изготовитель</th>
                <td className='td-head'>{producer}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
