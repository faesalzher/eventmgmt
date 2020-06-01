import uuid from 'uuid/v1';
import client1 from "assets/client-1.jpg";
import client2 from "assets/client-2.png";
import client3 from "assets/client-3.png";
export default [
  {
    id: uuid(),
    name: 'Client 1',
    imageUrl: client1,
  },
  {
    id: uuid(),
    name: 'Client 2',
    imageUrl: client2,
  },
  {
    id: uuid(),
    name: 'Client 3',
    imageUrl: client3,
  },
];
