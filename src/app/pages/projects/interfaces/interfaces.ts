export interface Project {
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
