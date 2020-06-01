import uuid from 'uuid/v1';
import volunteer1 from "assets/img/faces/avatar.jpg";
import volunteer2 from "assets/img/faces/christian.jpg";
import volunteer3 from "assets/img/faces/kendall.jpg";
export default [
  {
    id: uuid(),
    volunteer_name: 'Volunteer 1',
    event_id: '0',
    contact_person: '081615627998',
    info: 'Details goes in this section',
    imageUrl: volunteer1,
  },
  {
    id: uuid(),
    volunteer_name: 'Volunteer 2',
    event_id: '0',
    contact_person: '081615627998',
    info: 'Details goes in this section',
    imageUrl: volunteer2,
  },
  {
    id: uuid(),
    volunteer_name: 'Volunteer 3',
    event_id: '0',
    contact_person: '081615627998',
    info: 'Details goes in this section',
    imageUrl: volunteer3,
  },
];
