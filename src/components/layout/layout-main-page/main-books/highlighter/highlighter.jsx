import './highlighter.scss';

export const HighLighter = ({ text, highlight, highlightedItemClass }) => {
  if (!highlight) return text;
  const regexp = new RegExp(highlight, 'ig');
  const matchHighlight = text.match(regexp);

  if (matchHighlight) {
    return text.split(regexp).map((item, index, array) => {
      if (index < array.length - 1) {
        const dropLetter = matchHighlight.shift();

        return (
          <span key={Math.random()}>
            {item}
            <span data-test-id='highlight-matches' className={highlightedItemClass}>
              {dropLetter}
            </span>
          </span>
        );
      }

      return item;
    });
  }

  return text;
};
