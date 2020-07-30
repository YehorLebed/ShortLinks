import React from 'react';

const LinkCard = ({ link }) => {

  console.log(link);

  return (
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">

          <p>
            Сокращенная ссылка:
            <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
          </p>

          <p>
            Оригинальная ссылка:
            <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
          </p>

          <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>

          <p>Дата создания: <strong>{(new Date(link.date).toLocaleDateString())}</strong></p>

        </div>
        <div className="card-action">
          <a>This is a link</a>
        </div>
      </div>
    </div>
  )
}

export default LinkCard;