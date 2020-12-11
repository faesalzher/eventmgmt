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
    password: { type: GraphQLString },
    description: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    address: { type: GraphQLString },
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
    project_start_date: { type: GraphQLString },
    project_end_date: { type: GraphQLString },
    picture: { type: GraphQLString },
    created_at: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  }),
});

const Staff = require("./model/Staff");
const StaffType = new GraphQLObjectType({
  name: "Staff",
  fields: () => ({
    _id: { type: GraphQLID },
    staff_name: { type: GraphQLString },
    departement_position_id: { type: GraphQLString },
    email: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    password: { type: GraphQLString },
    picture: { type: GraphQLString },
    is_admin: { type: GraphQLBoolean },
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

const Departement_position = require("./model/Departement_position");
const Departement_positionType = new GraphQLObjectType({
  name: "Departement_position",
  fields: () => ({
    _id: { type: GraphQLID },
    departement_position_name: { type: GraphQLString },
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
    order: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  }),
});

const Committee = require("./model/Committee");
const CommitteeType = new GraphQLObjectType({
  name: "Committee",
  fields: () => ({
    _id: { type: GraphQLID },
    committee_name: { type: GraphQLString },
    core: { type: GraphQLBoolean },
    organization_id: { type: GraphQLString },
  }),
});

const Person_in_charge = require("./model/Person_in_charge");
const Person_in_chargeType = new GraphQLObjectType({
  name: "Person_in_charge",
  fields: () => ({
    _id: { type: GraphQLID },
    order: { type: GraphQLString },
    staff_id: { type: GraphQLString },
    committee_id: { type: GraphQLString },
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
    committee_id: { type: GraphQLString },
    event_id: { type: GraphQLString },
    project_id: { type: GraphQLString },
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
    phone_number: { type: GraphQLString },
    details: { type: GraphQLString },
    picture: { type: GraphQLString },
    event_id: { type: GraphQLString },
    project_id: { type: GraphQLString },
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
    project_id: { type: GraphQLString },
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
    project_id: { type: GraphQLString },
    event_id: { type: GraphQLString },
    organization_id: { type: GraphQLString },
  }),
});

const Task_assigned_to = require("./model/Task_assigned_to");
const Task_assigned_toType = new GraphQLObjectType({
  name: "Task_assigned_to",
  fields: () => ({
    _id: { type: GraphQLID },
    task_id: { type: GraphQLString },
    person_in_charge_id: { type: GraphQLString },
    roadmap_id: { type: GraphQLString },
    project_id: { type: GraphQLString },
    event_id: { type: GraphQLString },
    staff_id: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // check_organization: {
    //   type: new GraphQLList(OrganizationType),
    //   args: { email: { type: GraphQLString } },
    //   resolve(parent, args) {
    //     return Organization.find({ email: args.email });
    //   },
    // },
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
    check_staff: {
      type: new GraphQLList(StaffType),
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.find({ email: args.email });
      },
    },
    staffs: {
      type: new GraphQLList(StaffType),
      args: {
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.organization_id) {
          return Staff.find({ organization_id: args.organization_id });
        }
      },
    },
    staff: {
      type: StaffType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Staff.findById(args._id);
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
    events: {
      type: new GraphQLList(EventType),
      args: { project_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Event.find({ project_id: args.project_id });
      },
    },
    event: {
      type: EventType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Event.findById(args._id);
      },
    },
    departement_positions: {
      type: new GraphQLList(Departement_positionType),
      args: { organization_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Departement_position.find({
          organization_id: args.organization_id,
        });
      },
    },
    departement_position: {
      type: Departement_positionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Departement_position.findById(args._id);
      },
    },
    positions: {
      type: new GraphQLList(PositionType),
      args: { organization_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Position.find({ organization_id: args.organization_id });
      },
    },
    position: {
      type: PositionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Position.findById(args._id);
      },
    },

    committees: {
      type: new GraphQLList(CommitteeType),
      args: { organization_id: { type: GraphQLString } },
      resolve(parent, args) {
        return Committee.find({ organization_id: args.organization_id });
      },
    },
    committee: {
      type: CommitteeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Committee.findById(args._id);
      },
    },
    core_committee: {
      type: CommitteeType,
      args: {
        organization_id: { type: GraphQLString },
        core: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return Committee.findOne({
          organization_id: args.organization_id,
          core: args.core,
        });
      },
    },
    person_in_charges: {
      type: new GraphQLList(Person_in_chargeType),
      args: {
        staff_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
        committee_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.staff_id) {
          return Person_in_charge.find({ staff_id: args.staff_id });
        }
        if (args.project_id) {
          return Person_in_charge.find({ project_id: args.project_id });
        }
        if (args.committee_id) {
          return Person_in_charge.find({ committee_id: args.committee_id });
        }
      },
    },
    person_in_charges_by_project_and_order: {
      type: Person_in_chargeType,
      args: {
        project_id: { type: GraphQLString },
        order: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Person_in_charge.findOne({
          project_id: args.project_id,
          order: args.order,
        });
      },
    },
    person_in_charges_by_staff_and_project: {
      type: Person_in_chargeType,
      args: {
        staff_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Person_in_charge.findOne({
          staff_id: args.staff_id,
          project_id: args.project_id,
        });
      },
    },
    person_in_charges_by_committee_and_project: {
      type: new GraphQLList(Person_in_chargeType),
      args: {
        committee_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Person_in_charge.find({
          committee_id: args.committee_id,
          project_id: args.project_id,
        });
      },
    },
    person_in_charge: {
      type: Person_in_chargeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Person_in_charge.findById(args._id);
      },
    },
    roadmaps: {
      type: new GraphQLList(RoadmapType),
      args: {
        event_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        query = {};
        if (args.event_id) {
          query = Roadmap.find({ event_id: args.event_id });
        }
        if (args.project_id) {
          query = Roadmap.find({ project_id: args.project_id });
        }
        return query;
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
      args: {
        event_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.event_id) {
          return External.find({ event_id: args.event_id });
        }
        if (args.project_id) {
          return External.find({ project_id: args.project_id });
        }
      },
    },
    agendas: {
      type: new GraphQLList(AgendaType),
      args: {
        event_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.event_id) {
          return Agenda.find({ event_id: args.event_id });
        }
        if (args.project_id) {
          return Agenda.find({ project_id: args.project_id });
        }
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
      args: {
        roadmap_id: { type: GraphQLString },
        created_by: { type: GraphQLString },
        event_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.roadmap_id) {
          return Task.find({ roadmap_id: args.roadmap_id });
        }
        if (args.created_by) {
          return Task.find({ created_by: args.created_by });
        }
        if (args.project_id) {
          return Task.find({ project_id: args.project_id });
        }
        if (args.event_id) {
          return Task.find({ event_id: args.event_id });
        }
        if (args.organization_id) {
          return Task.find({ organization_id: args.organization_id });
        }
      },
    },
    task_assigned_tos: {
      type: new GraphQLList(Task_assigned_toType),
      args: {
        task_id: { type: GraphQLString },
        staff_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
        event_id: { type: GraphQLString },
        roadmap_id: { type: GraphQLString },
        person_in_charge_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        if (args.task_id) {
          return Task_assigned_to.find({ task_id: args.task_id });
        }
        if (args.staff_id) {
          return Task_assigned_to.find({
            staff_id: args.staff_id,
          });
        }
        if (args.person_in_charge_id) {
          return Task_assigned_to.find({
            person_in_charge_id: args.person_in_charge_id,
          });
        }
        if (args.project_id) {
          return Task_assigned_to.find({ project_id: args.project_id });
        }
        if (args.event_id) {
          return Task_assigned_to.find({ event_id: args.event_id });
        }
        if (args.roadmap_id) {
          return Task_assigned_to.find({ roadmap_id: args.roadmap_id });
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganization: {
      type: OrganizationType,
      args: {
        _id: { type: GraphQLID },
        organization_name: { type: GraphQLString },
        description: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        address: { type: GraphQLString },
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
          description: args.description,
          email: args.email,
          phone_number: args.phone_number,
          address: args.address,
          picture: args.picture,
        });
        return organization.save();
      },
    },
    editOrganization: {
      type: OrganizationType,
      args: {
        _id: { type: GraphQLString },
        organization_name: { type: GraphQLString },
        description: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        address: { type: GraphQLString },
        picture: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          organization_name: args.organization_name,
          description: args.description,
          picture: args.picture,
          email: args.email,
          phone_number: args.phone_number,
          address: args.address,
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
        project_start_date: { type: GraphQLString },
        project_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        created_at: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let project = new Project({
          _id: args._id,
          project_name: args.project_name,
          project_description: args.project_description,
          project_start_date: args.project_start_date,
          project_end_date: args.project_end_date,
          picture: args.picture,
          created_at: args.created_at,
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
        project_start_date: { type: GraphQLString },
        project_end_date: { type: GraphQLString },
        picture: { type: GraphQLString },
        created_at: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          project_name: args.project_name,
          project_description: args.project_description,
          project_start_date: args.project_start_date,
          project_end_date: args.project_end_date,
          picture: args.picture,
          created_at: args.created_at,
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
        departement_position_id: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        is_admin: { type: GraphQLBoolean },
        departement_id: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let staff = new Staff({
          _id: args._id,
          staff_name: args.staff_name,
          departement_position_id: args.departement_position_id,
          email: args.email,
          phone_number: args.phone_number,
          password: args.password,
          picture: args.picture,
          is_admin: args.is_admin,
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
        departement_position_id: { type: GraphQLString },
        email: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        password: { type: GraphQLString },
        picture: { type: GraphQLString },
        is_admin: { type: GraphQLBoolean },
        departement_id: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          _id: args._id,
          staff_name: args.staff_name,
          departement_position_id: args.departement_position_id,
          email: args.email,
          phone_number: args.phone_number,
          password: args.password,
          picture: args.picture,
          is_admin: args.is_admin,
          departement_id: args.departement_id,
          organization_id: args.organization_id,
        };
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
        let edit = {
          _id: args._id,
          departement_name: args.departement_name,
          organization_id: args.organization_id,
        };
        let departement = Departement.findByIdAndUpdate(args._id, edit, {
          new: true,
        });
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

    addPosition: {
      type: PositionType,
      args: {
        _id: { type: GraphQLString },
        position_name: { type: GraphQLString },
        core: { type: GraphQLBoolean },
        order: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let position = new Position({
          _id: args._id,
          position_name: args.position_name,
          core: args.core,
          order: args.order,
          organization_id: args.organization_id,
        });
        return position.save();
      },
    },
    editPosition: {
      type: PositionType,
      args: {
        _id: { type: GraphQLString },
        position_name: { type: GraphQLString },
        core: { type: GraphQLBoolean },
        order: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          _id: args._id,
          position_name: args.position_name,
          core: args.core,
          order: args.order,
          organization_id: args.organization_id,
        };
        let position = Position.findByIdAndUpdate(args._id, edit, {
          new: true,
        });
        return position;
      },
    },
    deletePosition: {
      type: PositionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let position = Position.findByIdAndDelete(args._id);
        return position;
      },
    },

    addDepartement_position: {
      type: Departement_positionType,
      args: {
        _id: { type: GraphQLString },
        departement_position_name: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let departement_position = new Departement_position({
          _id: args._id,
          departement_position_name: args.departement_position_name,
          organization_id: args.organization_id,
        });
        return departement_position.save();
      },
    },
    editDepartement_position: {
      type: Departement_positionType,
      args: {
        _id: { type: GraphQLString },
        departement_position_name: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          _id: args._id,
          departement_position_name: args.departement_position_name,
          organization_id: args.organization_id,
        };
        let departement_position = Departement_position.findByIdAndUpdate(
          args._id,
          edit,
          {
            new: true,
          }
        );
        return departement_position;
      },
    },
    deleteDepartement_position: {
      type: Departement_positionType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let departement_position = Departement_position.findByIdAndDelete(
          args._id
        );
        return departement_position;
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

    addCommittee: {
      type: CommitteeType,
      args: {
        _id: { type: GraphQLString },
        committee_name: { type: GraphQLString },
        core: { type: GraphQLBoolean },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let committee = new Committee({
          _id: args._id,
          committee_name: args.committee_name,
          core: args.core,
          organization_id: args.organization_id,
        });
        return committee.save();
      },
    },
    editCommittee: {
      type: CommitteeType,
      args: {
        _id: { type: GraphQLString },
        core: { type: GraphQLBoolean },
        committee_name: { type: GraphQLString },
        organization_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          _id: args._id,
          committee_name: args.committee_name,
          core: args.core,
          organization_id: args.organization_id,
        };
        let committee = Committee.findByIdAndUpdate(args._id, edit, {
          new: true,
        });
        return committee;
      },
    },
    deleteCommittee: {
      type: CommitteeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let committee = Committee.findByIdAndDelete(args._id);
        return committee;
      },
    },

    addPerson_in_charge: {
      type: Person_in_chargeType,
      args: {
        _id: { type: GraphQLString },
        order: { type: GraphQLString },
        staff_id: { type: GraphQLString },
        committee_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let person_in_charge = new Person_in_charge({
          _id: args._id,
          order: args.order,
          staff_id: args.staff_id,
          committee_id: args.committee_id,
          position_id: args.position_id,
          project_id: args.project_id,
        });
        return person_in_charge.save();
      },
    },
    editPerson_in_charge: {
      type: Person_in_chargeType,
      args: {
        _id: { type: GraphQLString },
        order: { type: GraphQLString },
        staff_id: { type: GraphQLString },
        position_id: { type: GraphQLString },
        committee_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          order: args.order,
          staff_id: args.staff_id,
          committee_id: args.committee_id,
          position_id: args.position_id,
          project_id: args.project_id,
        };
        let person_in_charge = Person_in_charge.findByIdAndUpdate(
          args._id,
          edit,
          { new: true }
        );

        return person_in_charge;
      },
    },
    deletePerson_in_charge: {
      type: Person_in_chargeType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        let person_in_charge = Person_in_charge.findByIdAndDelete(args._id);
        return person_in_charge;
      },
    },

    //roadmap
    addRoadmap: {
      type: RoadmapType,
      args: {
        _id: { type: GraphQLString },
        roadmap_name: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        color: { type: GraphQLString },
        committee_id: { type: GraphQLString },
        event_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let roadmap = new Roadmap({
          _id: args._id,
          roadmap_name: args.roadmap_name,
          start_date: args.start_date,
          end_date: args.end_date,
          color: args.color,
          committee_id: args.committee_id,
          event_id: args.event_id,
          project_id: args.project_id,
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
        committee_id: { type: GraphQLString },
        event_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          roadmap_name: args.roadmap_name,
          start_date: args.start_date,
          end_date: args.end_date,
          color: args.color,
          committee_id: args.committee_id,
          event_id: args.event_id,
          project_id: args.project_id,
        };

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

    //external
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
        project_id: { type: GraphQLString },
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
          project_id: args.project_id,
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
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          external_name: args.external_name,
          external_type: args.external_type,
          email: args.email,
          phone_number: args.phone_number,
          event_id: args.event_id,
          details: args.details,
          picture: args.picture,
          project_id: args.project_id,
        };

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

    //agenda
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
        project_id: { type: GraphQLString },
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
          project_id: args.project_id,
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
        project_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let edit = {
          agenda_name: args.agenda_name,
          start_time: args.start_time,
          end_time: args.end_time,
          date: args.date,
          event_id: args.event_id,
          details: args.details,
          project_id: args.project_id,
        };

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

    //task
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
        event_id: { type: GraphQLString },
        roadmap_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
        organization_id: { type: GraphQLString },
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
          event_id: args.event_id,
          roadmap_id: args.roadmap_id,
          project_id: args.project_id,
          organization_id: args.organization_id,
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
        event_id: { type: GraphQLString },
        roadmap_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
        organization_id: { type: GraphQLString },
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
          event_id: args.event_id,
          roadmap_id: args.roadmap_id,
          project_id: args.project_id,
          organization_id: args.organization_id,
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
        person_in_charge_id: { type: GraphQLString },
        event_id: { type: GraphQLString },
        roadmap_id: { type: GraphQLString },
        project_id: { type: GraphQLString },
        staff_id: { type: GraphQLString },
        created_at: { type: GraphQLString },
      },
      resolve(parent, args) {
        let task_assigned_to = new Task_assigned_to({
          _id: args._id,
          task_id: args.task_id,
          roadmap_id: args.roadmap_id,
          person_in_charge_id: args.person_in_charge_id,
          event_id: args.event_id,
          project_id: args.project_id,
          staff_id: args.staff_id,
          created_at: args.created_at,
        });
        return task_assigned_to.save();
      },
    },
    editTask_assigned_to: {
      type: Task_assigned_toType,
      args: {
        person_in_charge_id: { type: GraphQLString },
        staff_id: { type: GraphQLString },
      },
      resolve(parent, args) {
        let task_assigned_to = Task_assigned_to.updateMany(
          { person_in_charge_id: args.person_in_charge_id },
          { staff_id: args.staff_id },
          { new: true }
        );
        return task_assigned_to;
      },
    },
    delete_task_assigned_to: {
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
