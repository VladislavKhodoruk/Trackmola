export interface Project {
  id: string;
  name: string;
  fullName: string;
  manager: string;
  team: string[];
  description: string;
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
