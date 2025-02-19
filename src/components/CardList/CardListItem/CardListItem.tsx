import { Component } from "solid-js";
import { TCardItem } from "../../../types/CardItem";

type TProps = TCardItem;

const CardListItem: Component<TProps> = (props) => {
  return (
    <>
      <div>{props.name}</div>
    </>
  );
};

export default CardListItem;
