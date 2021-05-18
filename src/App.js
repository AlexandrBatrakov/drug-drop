import { useState } from 'react';
import './scss/App.scss'

function App() {

  const [cardList, setCardList] = useState([{
    id: 1,
    order: 4,
    text: 'Card 3',
  },
  {
    id: 2,
    order: 3,
    text: 'Card 1',
  },
  {
    id: 3,
    order: 2,
    text: 'Card 2',
  },
  {
    id: 4,
    order: 1,
    text: 'Card 4',
  }]);

  const [currentCard, setCurrentCard] = useState(null)

  const dragStartHandler = (el, card) => {
    setCurrentCard(card);
  };

  const dragEndHandler = (el) => {
    el.target.style.background = 'white';
  };

  const dragOverHandler = (el) => {
    el.preventDefault()
    el.target.style.background = 'red';
  };

  const dropHandler = (el, card) => {
    el.preventDefault();
    setCardList(cardList.map(c => {
      
      if (c.id === card.id) {
        return {...c, order: currentCard.order}
      }

      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }

      return c
    }))
    el.target.style.background = 'white';
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="App">
      {
        cardList.sort(sortCards).map(card =>
          <div
            onDragStart={(el) => dragStartHandler(el, card)}
            onDragLeave={(el) => dragEndHandler(el)}
            onDragEnd={(el) => dragEndHandler(el)}
            onDragOver={(el) => dragOverHandler(el)}
            onDrop={(el) => dropHandler(el, card)}
            draggable={true}
            className={'card'}>
            {card.text}
          </div>)
      }
    </div>
  );
}

export default App;
