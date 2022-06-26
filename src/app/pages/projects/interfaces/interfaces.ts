export interface Project {
  [x: string]: any;
  id: string;
  name: string;
  fullName: string;
  manager: string;
  team: string[];
}

export interface Task {
  projectId: string;
  date: Date;
  task: string;
  comment: string;
  duration: number;
  status: string;
  userId: string;
}
export interface UserProfileInProject {
  type: string;
  name: string;
  photo: string;
  email: string;
  position: string;
  location: string;
  qualification: string;
  projectId: string;
}
