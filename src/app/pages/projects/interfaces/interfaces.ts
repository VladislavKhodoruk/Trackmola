export interface Project {
  id: string;
  color: string;
  description: string;
  fullName: string;
  managersId: string[];
  name: string;
  taskId: string[];
}

export interface Task {
  id: string;
  archived: boolean;
  name: string;
  projectId: string;
}

export interface TaskTrack {
  comments: string;
  date: Date;
  duration: number;
  id: string;
  projectId: string;
  status: '';
  taskId: string;
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
