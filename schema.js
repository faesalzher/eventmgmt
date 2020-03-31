const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const Project = require('./model/Project')
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    _id: { type: GraphQLID },
    project_name: { type: GraphQLString },
    status: { type: GraphQLString },
    project_start_date: { type: GraphQLString },
    project_end_date: { type: GraphQLString },
    head_of_project_id: { type: GraphQLString }
  })
});

const Staff = require('./model/Staff')
const StaffType = new GraphQLObjectType({
  name: 'Staff',
  fields: () => ({
    _id: { type: GraphQLID },
    staff_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    address: { type: GraphQLString },
    departement_id: { type: GraphQLString },
  })
});

const Departement = require('./model/Departement')
const DepartementType = new GraphQLObjectType({
  name: 'Departement',
  fields: () => ({
    _id: { type: GraphQLID },
    departement_name: { type: GraphQLString },
  })
});


const Event = require('./model/Event')
const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    _id: { type: GraphQLID },
    event_name: { type: GraphQLString },
    status: { type: GraphQLString },
    event_start_date: { type: GraphQLString },
    event_end_date: { type: GraphQLString },
    staff: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      }
    },
    project: {
      type: ProjectType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.findById(args._id);
      }
    },
    projectByStatus: {
      type: new GraphQLList(ProjectType),
      args: { status: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.find({ status: args.status });
      }
    },
    staffs: {
      type: new GraphQLList(StaffType),
      resolve(parent, args) {
        return Staff.find({});
      }
    },
    staffById: {
      type: StaffType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.findById(args._id);
      }
    },
    staffsByDepartement: {
      type: new GraphQLList(StaffType),
      args: { departement_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.find({ departement_id: args.departement_id });
      }
    },
    departements: {
      type: new GraphQLList(DepartementType),
      resolve(parent, args) {
        return Departement.find({});
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({});
      }
    },
    event: {
      type: EventType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Event.findById(args._id);
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        _id: { type: GraphQLString },
        project_name: { type: GraphQLString },
        status: { type: GraphQLString },
        project_start_date: { type: GraphQLString },
        project_end_date: { type: GraphQLString },
        head_of_project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let project = new Project({
          _id: args._id,
          project_name: args.project_name,
          status: args.status,
          project_start_date: args.project_start_date,
          project_end_date: args.project_end_date,
          head_of_project_id: args.head_of_project_id,
        });
        return project.save();
      }
    },
    deleteProject: {
      type: ProjectType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let project = Project.findByIdAndDelete(args._id)
        return project
      }
    },

    addStaff: {
      type: StaffType,
      args: {
        _id: { type: GraphQLString },
        staff_name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        address: { type: GraphQLString },
        departement_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let staff = new Staff({
          _id: args._id,
          staff_name: args.staff_name,
          email: args.email,
          phone_number: args.phone_number,
          address: args.address,
          departement_id: args.departement_id,
        });
        return staff.save();
      }
    },
    editStaff: {
      type: StaffType,
      args: {
        _id: { type: GraphQLString },
        staff_name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        address: { type: GraphQLString },
        departement_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.staff_name) { edit.staff_name= args.staff_name }
        if (args.email) { edit.email = args.email }
        if (args.phone_number) { edit.phone_number = args.phone_number }
        if (args.address) { edit.address = args.address }
        if (args.departement_id) { edit.departement_id = args.departement_id }
        let staff = Staff.findByIdAndUpdate(args._id, edit, { new: true })
        return staff
      }
    },
    deleteStaff: {
      type: StaffType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let staff = Staff.findByIdAndDelete(args._id)
        return staff
      }
    },
    deleteStaffByDepartement: {
      type: StaffType,
      args: { departement_id: { type: GraphQLString } },
      resolve(parent, args) {
        let staff = Staff.findByIdAndDelete(args.departement_id)
        return staff
      }
    },
    addDepartement: {
      type: DepartementType,
      args: {
        _id: { type: GraphQLString },
        departement_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let departement = new Departement({
          _id: args._id,
          departement_name: args.departement_name,
        });
        return departement.save();
      }
    },
    editDepartement: {
      type: DepartementType,
      args: {
        _id: { type: GraphQLString },
        departement_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let departement = Departement.findByIdAndUpdate(args._id, { departement_name: args.departement_name }, { new: true })
        return departement
      }
    },
    deleteDepartement: {
      type: DepartementType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let departement = Departement.findByIdAndDelete(args._id)
        return departement
      }
    },

    addEvent: {
      type: EventType,
      args: {
        _id: { type: GraphQLString },
        event_name: { type: GraphQLString },
        event_start_date: { type: GraphQLString },
        event_end_date: { type: GraphQLString },
        staff: { type: GraphQLString },
      },
      resolve(parent, args) {
        let event = new Event({
          _id: args._id,
          event_name: args.event_name,
          event_start_date: args.event_start_date,
          event_end_date: args.event_end_date,
          staff: args.staff,
        });
        return event.save();
      }
    },
    deleteEvent: {
      type: EventType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let event = Event.findByIdAndDelete(args._id)
        return event
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
