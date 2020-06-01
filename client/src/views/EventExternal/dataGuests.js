import uuid from 'uuid/v1';
import guest1 from "assets/img/faces/avatar.jpg";
import guest2 from "assets/img/faces/christian.jpg";
import guest3 from "assets/img/faces/kendall.jpg";
export default [
  {
    id: uuid(),
    guest_name: 'Guest 1',
    event_id: '0',
    contact_person: '081615627998',
    info: 'Details goes in this section',
    imageUrl: guest1,
  },
  {
    id: uuid(),
    guest_name: 'Guest 2',
    event_id: '0',
    contact_person: '081615627998',
    info: 'Details goes in this section',
    imageUrl: guest2,
  },
  {
    id: uuid(),
    guest_name: 'Guest 3',
    event_id: '0',
    contact_person: '081615627998',
    info: 'Details goes in this section',
    imageUrl: guest3,
  },
];
