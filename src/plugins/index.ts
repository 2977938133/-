import {
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Row,
  Col,
  Popup,
  Progress,
  Tab,
  Tabs,
  Form,
  Field,
  CellGroup,
  Notify 
} from "vant";
const Item = [
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Row,
  Col,
  Popup,
  Progress,
  Tab,
  Tabs,
  Form,
  Field,
  CellGroup,
  Notify 
];
const Vant = (param: any) => {
  Item.forEach((i) => {
    return param.use(i);
  });
};
export default Vant;
