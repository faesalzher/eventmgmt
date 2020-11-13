const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const Organization = require("./model/Organization");
const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    _id: { type: GraphQLID },
    organization_name: { type: GraphQLString },
    email: { type: GraphQLID },
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    picture: { type: GraphQLString },
  }),
});

const Project = require("./model/Project");
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    _id: { type: GraphQLID },
    project_name: { type: GraphQLString },
    project_description: { type: GraphQLString },
    cancel: { type: GraphQLBoolean },
    project_start_date: { type: GraphQLString },
    project_end_date: { type: GraphQLString },
    picture: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  }),
});

const Staff = require("./model/Staff");
const StaffType = new GraphQLObjectType({
  name: "Staff",
  fields: () => ({
    _id: { type: GraphQLID },
    staff_name: { type: GraphQLString },
    position_name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    password: { type: GraphQLString },
    picture: { type: GraphQLString },
    departement_id: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  }),
});

const Departement = require("./model/Departement");
const DepartementType = new GraphQLObjectType({
  name: "Departement",
  fields: () => ({
    _id: { type: GraphQLID },
    departement_name: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  }),
});

const Event = require("./model/Event");
const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    _id: { type: GraphQLID },
    event_name: { type: GraphQLString },
    event_description: { type: GraphQLString },
    event_location: { type: GraphQLString },
    cancel: { type: GraphQLBoolean },
    event_start_date: { type: GraphQLString },
    event_end_date: { type: GraphQLString },
    picture: { type: GraphQLString },
    project_id: { type: GraphQLString },
  }),
});

const Position = require("./model/Position");
const PositionType = new GraphQLObjectType({
  name: "Position",
  fields: () => ({
    _id: { type: GraphQLID },
    position_name: { type: GraphQLString },
    core: { type: GraphQLBoolean },
  }),
});

const Division = require("./model/Division");
const DivisionType = new GraphQLObjectType({
  name: "Division",
  fields: () => ({
    _id: { type: GraphQLID },
    division_name: { type: GraphQLString },
    project_id: { type: GraphQLString },
  }),
});

const Comitee = require("./model/Comitee");
const ComiteeType = new GraphQLObjectType({
  name: "Comitee",
  fields: () => ({
    _id: { type: GraphQLID },
    staff_id: { type: GraphQLString },
    division_id: { type: GraphQLString },
    position_id: { type: GraphQLString },
    project_id: { type: GraphQLString },
  }),
});

const Roadmap = require("./model/Roadmap");
const RoadmapType = new GraphQLObjectType({
  name: "Roadmap",
  fields: () => ({
    _id: { type: GraphQLID },
    roadmap_name: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
    color: { type: GraphQLString },
    event_id: { type: GraphQLString },
  }),
});

const External = require("./model/External");
const ExternalType = new GraphQLObjectType({
  name: "External",
  fields: () => ({
    _id: { type: GraphQLID },
    external_name: { type: GraphQLString },
    external_type: { type: GraphQLString },
    email: { type: GraphQLString },
    event_id: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    details: { type: GraphQLString },
    picture: { type: GraphQLString },
  }),
});

const Agenda = require("./model/Agenda");
const AgendaType = new GraphQLObjectType({
  name: "Agenda",
  fields: () => ({
    _id: { type: GraphQLID },
    agenda_name: { type: GraphQLString },
    date: { type: GraphQLString },
    start_time: { type: GraphQLString },
    end_time: { type: GraphQLString },
    details: { type: GraphQLString },
    event_id: { type: GraphQLString },
  }),
});

const Task = require("./model/Task");
const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    _id: { type: GraphQLID },
    task_name: { type: GraphQLString },
    priority: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    task_description: { type: GraphQLString },
    due_date: { type: GraphQLString },
    completed_date: { type: GraphQLString },
    created_at: { type: GraphQLString },
    created_by: { type: GraphQLString },
    roadmap_id: { type: GraphQLString },
  }),
});

const Task_assigned_to = require("./model/Task_assigned_to");
const Task_assigned_toType = new GraphQLObjectType({
  name: "Task_assigned_to",
  fields: () => ({
    _id: { type: GraphQLID },
    task_id: { type: GraphQLString },
    comitee_id: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    check_organization: {
      type: new GraphQLList(OrganizationType),
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return Organization.find({ email: args.email });
      },
    },
    organization: {
      type: OrganizationType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Organization.findById(args._id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: { organization_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.find({ organization_id: args.organization_id });
      },
    },
    project: {
      type: ProjectType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.findById(args._id);
      },
    },
    // projectByStatus: {
    //   type: new GraphQLList(ProjectType),
    //   args: { status: { type: GraphQLString } },
    //   resolve(parent, args) {
    //     return Project.find({ status: args.status });
    //   }
    // },
    check_staff: {
      type: new GraphQLList(StaffType),
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.find({ email: args.email });
      },
    },
    staffs: {
      type: new GraphQLList(StaffType),
      args: { organization_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.find({ organization_id: args.organization_id });
      },
    },
    staffById: {
      type: StaffType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.findById(args._id);
      },
    },
    staffsByDepartement: {
      type: new GraphQLList(StaffType),
      args: { departement_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.find({ departement_id: args.departement_id });
      },
    },
    departements: {
      type: new GraphQLList(DepartementType),
      args: { organization_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Departement.find({ organization_id: args.organization_id });
      },
    },
    departement: {
      type: DepartementType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Departement.findById(args._id);
      },
    },
    eventsByProject: {
      type: new GraphQLList(EventType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Event.find({ project_id: args.project_id });
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({});
      },
    },
    event: {
      type: EventType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Event.findById(args._id);
      },
    },
    positions: {
      type: new GraphQLList(PositionType),
      resolve(parent, args) {
        return Position.find({});
      },
    },
    position: {
      type: PositionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Position.findById(args._id);
      },
    },
    divisionsByProject: {
      type: new GraphQLList(DivisionType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Division.find({ project_id: args.project_id });
      },
    },
    comiteesByProject: {
      type: new GraphQLList(ComiteeType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Comitee.find({ project_id: args.project_id });
      },
    },
    comitee: {
      type: ComiteeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Comitee.findById(args._id);
      },
    },
    comiteesByHeadProject: {
      type: new GraphQLList(ComiteeType),
      args: {
        project_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Comitee.find({
          project_id: args.project_id,
          position_id: args.position_id,
        });
      },
    },
    comiteesByStaff: {
      type: new GraphQLList(ComiteeType),
      args: { staff_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Comitee.find({ staff_id: args.staff_id });
      },
    },
    roadmaps: {
      type: new GraphQLList(RoadmapType),
      args: { event_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Roadmap.find({ event_id: args.event_id });
      },
    },
    roadmapByEvent: {
      type: new GraphQLList(RoadmapType),
      args: { event_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Roadmap.find({ event_id: args.event_id });
      },
    },
    roadmap: {
      type: RoadmapType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Roadmap.findById(args._id);
      },
    },
    externals: {
      type: new GraphQLList(ExternalType),
      args: { event_id: { type: GraphQLString } },
      resolve(parent, args) {
        return External.find({ event_id: args.event_id });
      },
    },
    agendas: {
      type: new GraphQLList(AgendaType),
      args: { event_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Agenda.find({ event_id: args.event_id });
      },
    },
    task: {
      type: TaskType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Task.findById(args._id);
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: { roadmap_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Task.find({ roadmap_id: args.roadmap_id });
      },
    },
    tasks_assigned_to: {
      type: new GraphQLList(Task_assigned_toType),
      args: { task_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Task_assigned_to.find({ task_id: args.task_id });
      },
    },
    tasks_assigned_to_by_comitee: {
      type: new GraphQLList(Task_assigned_toType),
      args: { comitee_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Task_assigned_to.find({ comitee_id: args.comitee_id });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: OrganizationType,
      args: {
        _id: { type: GraphQLID },
        organization_name: { type: GraphQLString },
        email: { type: GraphQLID },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve(parent, args) {
        // TODO: Make sure user doesnt already exist
        // const email = args.email;
        // const email_check = Organization.find({ email: args.email });
        // // console.log(email);
        // console.log(email_check);

        // if (email_check) {
        //   throw new UserInputError("Username is taken", {
        //     errors: {
        //       username: "This username is taken",
        //     },
        //   });
        // }

        let organization = new Organization({
          _id: args._id,
          organization_name: args.organization_name,
          email: args.email,
          password: args.password,
        });
        return organization.save();
      },
    },
    editOrganization: {
      type: OrganizationType,
      args: {
        _id: { type: GraphQLString },
        organization_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          organization_name: args.organization_name,
          email: args.email,
          password: args.password,
          description: args.description,
          picture: args.picture,
        };
        let organization = Organization.findByIdAndUpdate(args._id, edit, {
          new: true,
        });
        return organization;
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        _id: { type: GraphQLString },
        project_name: { type: GraphQLString },
        project_description: { type: GraphQLString },
        cancel: { type: GraphQLBoolean },
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
      },
    },
    editProject: {
      type: ProjectType,
      args: {
        _id: { type: GraphQLString },
        project_name: { type: GraphQLString },
        project_description: { type: GraphQLString },
        cancel: { type: GraphQLBoolean },
        project_start_date: { type: GraphQLString },
        project_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          project_name: args.project_name,
          project_description: args.project_description,
          cancel: args.cancel,
          project_start_date: args.project_start_date,
          project_end_date: args.project_end_date,
          picture: args.picture,
          organization_id: args.organization_id,
        };
        let project = Project.findByIdAndUpdate(args._id, edit, { new: true });
        return project;
      },
    },
    deleteProject: {
      type: ProjectType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let project = Project.findByIdAndDelete(args._id);
        return project;
      },
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
        organization_id: { type: GraphQLString },
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
          organization_id: args.organization_id,
        });
        return staff.save();
      },
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
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.staff_name) {
          edit.staff_name = args.staff_name;
        }
        if (args.position_name) {
          edit.position_name = args.position_name;
        }
        if (args.email) {
          edit.email = args.email;
        }
        if (args.phone_number) {
          edit.phone_number = args.phone_number;
        }
        if (args.password) {
          edit.password = args.password;
        }
        if (args.picture) {
          edit.picture = args.picture;
        }
        if (args.departement_id) {
          edit.departement_id = args.departement_id;
        }
        if (args.organization_id) {
          edit.organization_id = args.organization_id;
        }
        let staff = Staff.findByIdAndUpdate(args._id, edit, { new: true });
        return staff;
      },
    },
    deleteStaff: {
      type: StaffType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let staff = Staff.findByIdAndDelete(args._id);
        return staff;
      },
    },
    deleteStaffByDepartement: {
      type: StaffType,
      args: { departement_id: { type: GraphQLString } },
      resolve(parent, args) {
        let staff = Staff.findByIdAndDelete(args.departement_id);
        return staff;
      },
    },

    addDepartement: {
      type: DepartementType,
      args: {
        _id: { type: GraphQLString },
        departement_name: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let departement = new Departement({
          _id: args._id,
          departement_name: args.departement_name,
          organization_id: args.organization_id,
        });
        return departement.save();
      },
    },
    editDepartement: {
      type: DepartementType,
      args: {
        _id: { type: GraphQLString },
        departement_name: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let departement = Departement.findByIdAndUpdate(
          args._id,
          { departement_name: args.departement_name },
          { organization_id: args.organization_id },
          { new: true }
        );
        return departement;
      },
    },
    deleteDepartement: {
      type: DepartementType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let departement = Departement.findByIdAndDelete(args._id);
        return departement;
      },
    },

    addEvent: {
      type: EventType,
      args: {
        _id: { type: GraphQLString },
        event_name: { type: GraphQLString },
        event_description: { type: GraphQLString },
        event_location: { type: GraphQLString },
        cancel: { type: GraphQLBoolean },
        event_start_date: { type: GraphQLString },
        event_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        project_id: { type: GraphQLString },
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
      },
    },
    editEvent: {
      type: EventType,
      args: {
        _id: { type: GraphQLString },
        event_name: { type: GraphQLString },
        event_description: { type: GraphQLString },
        event_location: { type: GraphQLString },
        cancel: { type: GraphQLBoolean },
        event_start_date: { type: GraphQLString },
        event_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          event_name: args.event_name,
          event_description: args.event_description,
          event_location: args.event_location,
          cancel: args.cancel,
          event_start_date: args.event_start_date,
          event_end_date: args.event_end_date,
          picture: args.picture,
          project_id: args.project_id,
        };
        let event = Event.findByIdAndUpdate(args._id, edit, { new: true });
        return event;
      },
    },
    deleteEvent: {
      type: EventType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let event = Event.findByIdAndDelete(args._id);
        return event;
      },
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
      },
    },
    editDivision: {
      type: DivisionType,
      args: {
        _id: { type: GraphQLString },
        division_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let division = Division.findByIdAndUpdate(
          args._id,
          { division_name: args.division_name },
          { new: true }
        );
        return division;
      },
    },
    deleteDivision: {
      type: DivisionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let division = Division.findByIdAndDelete(args._id);
        return division;
      },
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
      },
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
        if (args.staff_id) {
          edit.staff_id = args.staff_id;
        }
        if (args.division_id) {
          edit.division_id = args.division_id;
        }
        if (args.position_id) {
          edit.position_id = args.position_id;
        }
        if (args.project_id) {
          edit.project_id = args.project_id;
        }
        let comitee = Comitee.findByIdAndUpdate(args._id, edit, { new: true });
        return comitee;
      },
    },
    deleteComitee: {
      type: ComiteeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let comitee = Comitee.findByIdAndDelete(args._id);
        return comitee;
      },
    },

    addRoadmap: {
      type: RoadmapType,
      args: {
        _id: { type: GraphQLString },
        roadmap_name: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        color: { type: GraphQLString },
        event_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let roadmap = new Roadmap({
          _id: args._id,
          roadmap_name: args.roadmap_name,
          start_date: args.start_date,
          end_date: args.end_date,
          color: args.color,
          event_id: args.event_id,
        });
        return roadmap.save();
      },
    },
    editRoadmap: {
      type: RoadmapType,
      args: {
        _id: { type: GraphQLString },
        roadmap_name: { type: GraphQLString },
        end_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        color: { type: GraphQLString },
        event_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.roadmap_name) {
          edit.roadmap_name = args.roadmap_name;
        }
        if (args.start_date) {
          edit.start_date = args.start_date;
        }
        if (args.end_date) {
          edit.end_date = args.end_date;
        }
        if (args.color) {
          edit.color = args.color;
        }
        if (args.event_id) {
          edit.event_id = args.event_id;
        }
        let roadmap = Roadmap.findByIdAndUpdate(args._id, edit, { new: true });
        return roadmap;
      },
    },
    deleteRoadmap: {
      type: RoadmapType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let roadmap = Roadmap.findByIdAndDelete(args._id);
        return roadmap;
      },
    },

    addExternal: {
      type: ExternalType,
      args: {
        _id: { type: GraphQLString },
        external_name: { type: GraphQLString },
        external_type: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        event_id: { type: GraphQLString },
        details: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve(parent, args) {
        let external = new External({
          _id: args._id,
          external_name: args.external_name,
          external_type: args.external_type,
          email: args.email,
          phone_number: args.phone_number,
          event_id: args.event_id,
          details: args.details,
          picture: args.picture,
        });
        return external.save();
      },
    },
    editExternal: {
      type: ExternalType,
      args: {
        _id: { type: GraphQLString },
        external_name: { type: GraphQLString },
        email: { type: GraphQLString },
        external_type: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        event_id: { type: GraphQLString },
        details: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.external_name) {
          edit.external_name = args.external_name;
        }
        if (args.external_type) {
          edit.external_type = args.external_type;
        }
        if (args.email) {
          edit.email = args.email;
        }
        if (args.phone_number) {
          edit.phone_number = args.phone_number;
        }
        if (args.event_id) {
          edit.event_id = args.event_id;
        }
        if (args.details) {
          edit.details = args.details;
        }
        if (args.picture) {
          edit.picture = args.picture;
        }
        let external = External.findByIdAndUpdate(args._id, edit, {
          new: true,
        });
        return external;
      },
    },
    deleteExternal: {
      type: ExternalType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let external = External.findByIdAndDelete(args._id);
        return external;
      },
    },

    addAgenda: {
      type: AgendaType,
      args: {
        _id: { type: GraphQLString },
        agenda_name: { type: GraphQLString },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        date: { type: GraphQLString },
        event_id: { type: GraphQLString },
        details: { type: GraphQLString },
      },
      resolve(parent, args) {
        let external = new Agenda({
          _id: args._id,
          agenda_name: args.agenda_name,
          start_time: args.start_time,
          end_time: args.end_time,
          date: args.date,
          event_id: args.event_id,
          details: args.details,
        });
        return external.save();
      },
    },
    editAgenda: {
      type: AgendaType,
      args: {
        _id: { type: GraphQLString },
        agenda_name: { type: GraphQLString },
        end_time: { type: GraphQLString },
        start_time: { type: GraphQLString },
        date: { type: GraphQLString },
        event_id: { type: GraphQLString },
        details: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {};
        if (args.agenda_name) {
          edit.agenda_name = args.agenda_name;
        }
        if (args.start_time) {
          edit.start_time = args.start_time;
        }
        if (args.end_time) {
          edit.end_time = args.end_time;
        }
        if (args.date) {
          edit.date = args.date;
        }
        if (args.event_id) {
          edit.event_id = args.event_id;
        }
        if (args.details) {
          edit.details = args.details;
        }
        let external = Agenda.findByIdAndUpdate(args._id, edit, {
          new: true,
        });
        return external;
      },
    },
    deleteAgenda: {
      type: AgendaType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let external = Agenda.findByIdAndDelete(args._id);
        return external;
      },
    },

    addTask: {
      type: TaskType,
      args: {
        _id: { type: GraphQLString },
        task_name: { type: GraphQLString },
        priority: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        task_description: { type: GraphQLString },
        due_date: { type: GraphQLString },
        completed_date: { type: GraphQLString },
        created_at: { type: GraphQLString },
        created_by: { type: GraphQLString },
        roadmap_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let task = new Task({
          _id: args._id,
          task_name: args.task_name,
          priority: args.priority,
          completed: args.completed,
          task_description: args.task_description,
          due_date: args.due_date,
          completed_date: args.completed_date,
          created_at: args.created_at,
          created_by: args.created_by,
          roadmap_id: args.roadmap_id,
        });
        return task.save();
      },
    },
    editTask: {
      type: TaskType,
      args: {
        _id: { type: GraphQLString },
        task_name: { type: GraphQLString },
        priority: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        task_description: { type: GraphQLString },
        due_date: { type: GraphQLString },
        completed_date: { type: GraphQLString },
        created_at: { type: GraphQLString },
        created_by: { type: GraphQLString },
        roadmap_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          task_name: args.task_name,
          priority: args.priority,
          completed: args.completed,
          task_description: args.task_description,
          due_date: args.due_date,
          completed_date: args.completed_date,
          created_at: args.created_at,
          created_by: args.created_by,
          roadmap_id: args.roadmap_id,
        };
        let task = Task.findByIdAndUpdate(args._id, edit, { new: true });
        return task;
      },
    },
    deleteTask: {
      type: TaskType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let task = Task.findByIdAndDelete(args._id);
        return task;
      },
    },

    addTask_assigned_to: {
      type: Task_assigned_toType,
      args: {
        _id: { type: GraphQLString },
        task_id: { type: GraphQLString },
        comitee_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let task_assigned_to = new Task_assigned_to({
          _id: args._id,
          task_id: args.task_id,
          comitee_id: args.comitee_id,
        });
        return task_assigned_to.save();
      },
    },
    deleteTask_assigned_to: {
      type: Task_assigned_toType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let task_assigned_to = Task_assigned_to.findByIdAndDelete(args._id);
        return task_assigned_to;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
