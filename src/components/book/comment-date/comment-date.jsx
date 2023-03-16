export const CommentDate = () => {
  const months = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Mая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
  };
  const today = new Date();
  const date = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  return <div>{date}</div>;
};
