import "../UI/Card.css";
function Card(props) {
  return <div className={props.cardType}>{props.content}</div>;
}

export default Card;
