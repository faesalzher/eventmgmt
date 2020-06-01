import uuid from 'uuid/v1';
import client1 from "assets/client-1.jpg";
import client2 from "assets/client-2.png";
import client3 from "assets/client-3.png";
export default [
  {
    id: uuid(),
    sponsor_name: 'Client 1',
    event_id: '0',
    contact_person: '081615627998',
    details: 'Details goes in this section',
    imageUrl: client1,
  },
  {
    id: uuid(),
    sponsor_name: 'Client 2',
    event_id: '0',
    contact_person: '081615627998',
    details: 'Details goes in this section',
    imageUrl: client2,
  },
  {
    id: uuid(),
    sponsor_name: 'Client 3',
    event_id: '0',
    contact_person: '081615627998',
    details: 'Details goes in this section',
    imageUrl: client3,
  },
];
