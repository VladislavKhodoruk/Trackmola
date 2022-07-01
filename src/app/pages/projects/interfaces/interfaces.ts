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

export interface User {
  birthday: Date;
  email: string;
  fullname: string;
  id: string;
  location: string;
  photo: string;
  position: string;
  qualification: string;
  role: string;
  startDate: Date;
  timeZone: string;
}
