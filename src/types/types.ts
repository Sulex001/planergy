interface Company {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    createdBy: string; // userId
  }
  
  interface User {
    id: string;
    companyId: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    profileImage: string;
    role: 'Admin' | 'Member';
    createdAt: Date;
  }
  
  interface Project {
    id: string;
    companyId: string;
    Title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
    createdBy: string; // userId
    createdAt: Date;
  }
  
  interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    assignedTo: string; // userId
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    dueDate: Date;
    createdBy: string; // userId
    createdAt:  Date
  }
  
  interface File {
    id: string;
    projectId: string;
    taskId?: string; // Optional, if associated with a task
    name: string;
    url: string;
    uploadedBy: string; // userId
    uploadedAt: Date;
  }
  
  interface Comment {
    id: string;
    projectId: string;
    taskId?: string; // Optional, if associated with a task
    content: string;
    postedBy: string; // userId
    createdAt: Date;
  }
  
  interface Team {
    id: string;
    projectId: string;
    name: string;
    members: string[]; // array of userIds
    createdAt: Date;
    createdBy: string; // userId
  }
  
  interface Notification {
    id: string;
    userId: string;
    content: string;
    read: boolean;
    createdAt: Date;
  }
  
  interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    read: boolean;
    sentAt: Date;
  }
  
  

  export type Entity  = User | Message |Company| Project | Task | File |Team | Notification | Comment; 
  export type {User, Message, Company, Project, Task, File, Team , Notification, Comment}