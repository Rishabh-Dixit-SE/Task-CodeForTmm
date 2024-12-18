import React from "react";

const Card = ({ value, onDelete }) => {
  return (
    <div className="Card">
      <div className="delete">
        <button onClick={() => onDelete(value.id)}>Delete</button>
      </div>

      <img src={value.images && value.images[0]} alt={value.title} />
      <div className="Cd">
        <strong>Title:</strong>
        {value.title}
      </div>
      <div className="Cd">
        <strong>description:</strong>
        {value.description}
      </div>
      <div className="Cd">
        <strong>Price:</strong>
        {parseInt(value.price * 78)}/-Rs
      </div>
    </div>
  );
};

export default Card;
