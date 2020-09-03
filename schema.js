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
    project_description: { type: GraphQLString },
    cancel: { type: GraphQLString },
    project_start_date: { type: GraphQLString },
    project_end_date: { type: GraphQLString },
    picture: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  })
});

const Staff = require('./model/Staff')
const StaffType = new GraphQLObjectType({
  name: 'Staff',
  fields: () => ({
    _id: { type: GraphQLID },
    staff_name: { type: GraphQLString },
    position_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    password: { type: GraphQLString },
    picture: { type: GraphQLString },
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
    event_description: { type: GraphQLString },
    event_location: { type: GraphQLString },
    cancel: { type: GraphQLString },
    event_start_date: { type: GraphQLString },
    event_end_date: { type: GraphQLString },
    picture: { type: GraphQLString },
    project_id: { type: GraphQLString }
  })
});

const Position = require('./model/Position')
const PositionType = new GraphQLObjectType({
  name: 'Position',
  fields: () => ({
    _id: { type: GraphQLID },
    position_name: { type: GraphQLString },
    core: { type: GraphQLString },
  })
});

const Division = require('./model/Division')
const DivisionType = new GraphQLObjectType({
  name: 'Division',
  fields: () => ({
    _id: { type: GraphQLID },
    division_name: { type: GraphQLString },
    project_id: { type: GraphQLString },
  })
});

const Comitee = require('./model/Comitee')
const ComiteeType = new GraphQLObjectType({
  name: 'Comitee',
  fields: () => ({
    _id: { type: GraphQLID },
    staff_id: { type: GraphQLString },
    division_id: { type: GraphQLString },
    position_id: { type: GraphQLString },
    project_id: { type: GraphQLString },
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
    // projectByStatus: {
    //   type: new GraphQLList(ProjectType),
    //   args: { status: { type: GraphQLString } },
    //   resolve(parent, args) {
    //     return Project.find({ status: args.status });
    //   }
    // },
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
    eventsByProject: {
      type: new GraphQLList(EventType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Event.find({ project_id: args.project_id });
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
    positions: {
      type: new GraphQLList(PositionType),
      resolve(parent, args) {
        return Position.find({});
      }
    },
    divisionsByProject: {
      type: new GraphQLList(DivisionType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Division.find({ project_id: args.project_id });
      }
    },
    // divisionIdByProjectAndName: {
    //   type: new GraphQLList(DivisionType),
    //   args: { project_id: { type: GraphQLString } },
    //   args: { division_name: { type: GraphQLString } },
    //   resolve(parent, args) {
    //     return Division.find({ project_id: args.project_id, division_name: args.division_name });
    //   }
    // },
    comiteesByProject: {
      type: new GraphQLList(ComiteeType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Comitee.find({ project_id: args.project_id });
      }
    },
    comiteesByHeadProject: {
      type: new GraphQLList(ComiteeType),
      args: {
        project_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Comitee.find({ project_id: args.project_id, position_id: args.position_id });
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
        project_description: { type: GraphQLString },
        cancel: { type: GraphQLString },
        project_start_date: { type: GraphQLString },
        project_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let project = new Project({
          _id: args._id,
          project_name: args.project_name,
          project_description: args.project_description,
          cancel: args.cancel,
          project_start_date: args.project_start_date,
          project_end_date: args.project_end_date,
          picture: args.picture,
          organization_id: args.organization_id,
        });
        return project.save();
      }
    },
    editProject: {
      type: ProjectType,
      args: {
        _id: { type: GraphQLString },
        project_name: { type: GraphQLString },
        project_description: { type: GraphQLString },
        cancel: { type: GraphQLString },
        project_start_date: { type: GraphQLString },
        project_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.project_name) { edit.project_name = args.project_name }
        if (args.project_description) { edit.project_description = args.project_description }
        if (args.cancel) { edit.cancel = args.cancel }
        if (args.project_start_date) { edit.project_start_date = args.project_start_date }
        if (args.project_end_date) { edit.project_end_date = args.project_end_date }
        if (args.picture) { edit.picture = args.picture }
        if (args.organization_id) { edit.organization_id = args.organization_id }
        let project = Project.findByIdAndUpdate(args._id, edit, { new: true })
        return project
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
        position_name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        departement_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let staff = new Staff({
          _id: args._id,
          staff_name: args.staff_name,
          position_name: args.position_name,
          email: args.email,
          phone_number: args.phone_number,
          password: args.password,
          picture: args.picture,
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
        position_name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        departement_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.staff_name) { edit.staff_name = args.staff_name }
        if (args.position_name) { edit.position_name = args.position_name }
        if (args.email) { edit.email = args.email }
        if (args.phone_number) { edit.phone_number = args.phone_number }
        if (args.password) { edit.password = args.password }
        if (args.picture) { edit.picture = args.picture }
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
        event_description: { type: GraphQLString },
        event_location: { type: GraphQLString },
        cancel: { type: GraphQLString },
        event_start_date: { type: GraphQLString },
        event_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        project_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        let event = new Event({
          _id: args._id,
          event_name: args.event_name,
          event_description: args.event_description,
          event_location: args.event_location,
          cancel: args.cancel,
          event_start_date: args.event_start_date,
          event_end_date: args.event_end_date,
          picture: args.picture,
          project_id: args.project_id,
        });
        return event.save();
      }
    },
    editEvent: {
      type: EventType,
      args: {
        _id: { type: GraphQLString },
        event_name: { type: GraphQLString },
        event_description: { type: GraphQLString },
        event_location: { type: GraphQLString },
        cancel: { type: GraphQLString },
        event_start_date: { type: GraphQLString },
        event_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        project_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        let edit = {};
        if (args.event_name) { edit.event_name = args.event_name }
        if (args.event_description) { edit.event_description = args.event_description }
        if (args.event_location) { edit.event_location = args.event_location }
        if (args.cancel) { edit.cancel = args.cancel }
        if (args.event_start_date) { edit.event_start_date = args.event_start_date }
        if (args.event_end_date) { edit.event_end_date = args.event_end_date }
        if (args.picture) { edit.picture = args.picture }
        if (args.project_id) { edit.project_id = args.project_id }
        let event = Event.findByIdAndUpdate(args._id, edit, { new: true })
        return event
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

    addDivision: {
      type: DivisionType,
      args: {
        _id: { type: GraphQLString },
        division_name: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let division = new Division({
          _id: args._id,
          division_name: args.division_name,
          project_id: args.project_id,
        });
        return division.save();
      }
    },
    editDivision: {
      type: DivisionType,
      args: {
        _id: { type: GraphQLString },
        division_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let division = Division.findByIdAndUpdate(args._id, { division_name: args.division_name }, { new: true })
        return division
      }
    },
    deleteDivision: {
      type: DivisionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let division = Division.findByIdAndDelete(args._id)
        return division
      }
    },

    addComitee: {
      type: ComiteeType,
      args: {
        _id: { type: GraphQLString },
        staff_id: { type: GraphQLString },
        division_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let comitee = new Comitee({
          _id: args._id,
          staff_id: args.staff_id,
          division_id: args.division_id,
          position_id: args.position_id,
          project_id: args.project_id,
        });
        return comitee.save();
      }
    },
    editComitee: {
      type: ComiteeType,
      args: {
        _id: { type: GraphQLString },
        staff_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
        division_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.staff_id) { edit.staff_id = args.staff_id }
        if (args.division_id) { edit.division_id = args.division_id }
        if (args.position_id) { edit.position_id = args.position_id }
        if (args.project_id) { edit.project_id = args.project_id }
        let comitee = Comitee.findByIdAndUpdate(args._id, edit, { new: true })
        return comitee
      }
    },
    deleteComitee: {
      type: ComiteeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let comitee = Comitee.findByIdAndDelete(args._id)
        return comitee
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
