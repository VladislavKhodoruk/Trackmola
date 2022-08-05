import { Timestamp } from 'firebase/firestore';

import {
  User,
  Task,
  TaskTrack,
  Project,
  Vacation,
} from '@shared/interfaces/interfaces';

export const mockUsers: User[] = [
  {
    birthday: new Timestamp(900795600, 465000000),
    email: 'mivakhnenko@datamola.com',
    fullName: 'Maria Ivakhnenko',
    id: 'FyTQtfAXBMPaa3yKJ4TmVVgTA872',
    location: 'Minsk',
    photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
    position: 'CTO',
    qualification: 'Senior',
    role: 'CTO',
    startDate: new Timestamp(1654030800, 882000000),
    timeZone: '+3',
  },
  {
    birthday: new Timestamp(751672800, 367000000),
    email: 'vchistiakov@datamola.com',
    fullName: 'Vitalii Chistiakov',
    id: 'P4SeopCIcgbAmGkoS8JE0Rq0t1v1',
    location: 'Minsk',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/62970818a0eafd0069e86612/69cd9846-5c68-482e-bb26-81bf77da957b/128',
    position: 'Admin',
    qualification: 'middle',
    role: 'Admin',
    startDate: new Timestamp(1654030800, 313000000),
    timeZone: '+3',
  },
  {
    birthday: new Timestamp(1025125200, 844000000),
    email: 'vkhodoruk@datamola.com',
    fullName: 'Vladislav Khodoruk',
    id: 'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
    location: 'Minsk',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6298604da0eafd0069e8f7cd/1656ba5b-b78b-4822-846f-ecb40c4e4899/128',
    position: 'manager',
    qualification: 'Senior',
    role: 'manager',
    startDate: new Timestamp(1654030800, 283000000),
    timeZone: '+3',
  },
  {
    birthday: new Timestamp(802904400, 31000000),
    email: 'kborisenok@datamola.com',
    fullName: 'Kirill Borisenok',
    id: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
    location: 'Bobruisk',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
    position: 'Frontend developer',
    qualification: 'Student',
    role: 'employee',
    startDate: new Timestamp(1654030800, 517000000),
    timeZone: '+3',
  },
  {
    birthday: new Timestamp(867904915, 371000000),
    email: 'ashinkarev@datamola.com',
    fullName: 'Andrei Shinkarev',
    id: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    location: 'Mogilev',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/62985f0ac3dffc0068f5ddff/864cad92-da20-48f3-b5b4-54d2a6c74170/128',
    position: 'Frontend Developer',
    qualification: 'Student',
    role: 'employee',
    startDate: new Timestamp(1654030800, 259000000),
    timeZone: '+3',
  },
  {
    birthday: new Timestamp(773010000, 772000000),
    email: 'employee@google.com',
    fullName: 'Elon Mask',
    id: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    location: 'Minsk',
    photo:
      'https://www.tadviser.ru/images/thumb/b/bc/Elon-SEC-HGK1DB.jpg/840px-Elon-SEC-HGK1DB.jpg',
    position: 'Frontend developer',
    qualification: 'Student',
    role: 'employee',
    startDate: new Timestamp(1654030800, 211000000),
    timeZone: '+3',
  },
];

export const mockTasks: Task[] = [
  {
    archived: false,
    id: '0N9SBvw8R48Ybb1rw3T4',
    name: 'Daily activity chart',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: '33vqSse9t7ZBt7L9dU4E',
    name: 'Create vacations  component',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: '7RSD0NbwupaS9X02TNZw',
    name: 'Working hours chart  component',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: '8K3meYpeXrGzpGjnJPnR',
    name: 'Today view (store)',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: '8NVvNqnhPXLdvtQOBaU9',
    name: 'Create activity by projects chart component',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'DAbIvkXwQTpwc2fSTCyj',
    name: 'Projects page polishing',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'Dp62ch3RLoOnV2NMjky0',
    name: 'Create app',
    projectId: 'lrvIgoy3xaroJTWlBeTx',
  },
  {
    archived: true,
    id: 'EtmWicPcMobMNnSAsbRT',
    name: 'Create calendar navigation',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'FwXyPX0Ffi17hAmggPFA',
    name: 'Add time track form',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'Hc4YbEPzpiifROv5sa8O',
    name: 'Dachboard page polishing',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'QKjSwPFnjttXhANdb3ym',
    name: 'Create active tasks list  component',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: true,
    id: 'QY81kEvbTr0SbeUXnAgg',
    name: 'Add authorization',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: true,
    id: 'TDIUIUOVf4jeIG9mAR3W',
    name: 'Integrate store',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'UWaVlIkICl5i9pAG7bk6',
    name: 'Activity total cards',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'Uo7r5QOnCaSxLBgdYk5X',
    name: 'Create authorization',
    projectId: 'lrvIgoy3xaroJTWlBeTx',
  },
  {
    archived: false,
    id: 'XgtweOoksn6fBDSE8i04',
    name: 'Create today wiew component',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'biTabiSBOm6oIEgtTeXb',
    name: 'Create project team',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: true,
    id: 'f0gIlkC9lXqjC8gWcYV3',
    name: 'Add Angular Material',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'gE62UaYK4O1ANmriuPrV',
    name: 'My Activity page polishing',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'gJGIgdv9AagjEnE3ZD2u',
    name: 'Create user profile',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
  },
  {
    archived: true,
    id: 'gkHHSsV3n1eKiqqDZe27',
    name: 'create Team page',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: true,
    id: 'hn5F9D4QrvTMmFK7sxmB',
    name: 'Projects list with search',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'loY95YR5iaDUjAVa3F1M',
    name: 'Project tasks list',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'ns3AEnKBPZba136yvRlX',
    name: 'My report page polishing',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'pr0QyzdmBmfo2gIdkQ0l',
    name: 'Create profile page',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'qrrUL82KfjnzFWEIToEH',
    name: 'Create Projects Page',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'v0LbADWIFPqFSKM6EuMr',
    name: 'Daily activity chart(store->chart)',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: true,
    id: 'wwwKItkbi4XLCeph58X6',
    name: 'Calendar week view',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    id: 'xBgaMXjSCTN8snri41dW',
    name: 'Create project tasks list',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
];

export const mockTaskTracks: TaskTrack[] = [
  {
    comments: '',
    date: new Timestamp(1656363600, 0),
    duration: 1,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1658091600, 0),
    duration: 1,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658291600, 0),
    duration: 3,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658791600, 0),
    duration: 3,
    id: '96EIUKidaB6vHHBqq8RN',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658891600, 0),
    duration: 3,
    id: '96EIUKidaB6vHHBqq8RN',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658191600, 0),
    duration: 4,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658191600, 0),
    duration: 3,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658191600, 0),
    duration: 3,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658091600, 0),
    duration: 2,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658091600, 0),
    duration: 2,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(16580191600, 0),
    duration: 4,
    id: 'rzII60XeOjedTldViiUo',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1658091600, 0),
    duration: 2,
    id: '96EIUKidaB6vHHBqq8RN',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1657999999, 0),
    duration: 2,
    id: 'EDcVJRAcvMIM5qt9feQh',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1657486800, 0),
    duration: 2,
    id: 'EDcVJRAcvMIM5qt9feQh',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: 'dsdfdsf',
    date: new Timestamp(1657227600, 0),
    duration: 4,
    id: 'Fet7gIKI537tVEPJjsxh',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: 'xBgaMXjSCTN8snri41dW',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments:
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iste adipisci facilis perspiciatis quam voluptatum, ipsum asperiores quo, dolor at atque cupiditate, aliquam possimus sapiente impedit placeat! Rerum, voluptatem autem.',
    date: new Timestamp(1657314000, 0),
    duration: 3,
    id: 'LrOC5q7u1DJFkaHK72LX',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: 'xBgaMXjSCTN8snri41dW',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1657486800, 0),
    duration: 3,
    id: 'MZi0MOIwZA6wKJRufNVF',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments:
      // eslint-disable-next-line max-len
      'vvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvv',
    date: new Timestamp(1657314000, 0),
    duration: 2,
    id: 'TF0LuEOYapFhYkzmGnAK',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: 'xBgaMXjSCTN8snri41dW',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1656622800, 0),
    duration: 3,
    id: 'VUW0ERxrxYJlQcU3IhQ7',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658922697, 0),
    duration: 3,
    id: 'VUW0ERxrxYJlQcU3IhQ7',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658812903, 0),
    duration: 6,
    id: 'VUW0ERxrxYJlQcU3IhQ7',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1658712903, 0),
    duration: 6,
    id: 'VUW0ERxrxYJlQcU3IhQ7',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    taskTrackStatus: 'new',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    date: new Timestamp(1657400400, 0),
    duration: 3,
    id: 'aUYyRWCp155mdRx6bZgp',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: 'in progress',
    taskId: 'xBgaMXjSCTN8snri41dW',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1657535499, 0),
    duration: 3,
    id: 'dBhXfrNBVNovZqE8Zc9B',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: '33vqSse9t7ZBt7L9dU4E',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1657535499, 0),
    duration: 1,
    id: 'rzII60XeOjedTldViiUo',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1657535499, 0),
    duration: 1,
    id: 'rzII60XeOjedTldViiUo',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    taskTrackStatus: 'new',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    comments: '',
    date: new Timestamp(1658990476, 0),
    duration: 1,
    id: 'sQEgQpv0l3nvshNycxad',
    overtime: true,
    overtimeDuration: 0.5,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    taskTrackStatus: 'new',
    userId: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
  },
  {
    comments: '',
    date: new Timestamp(1658950476, 0),
    duration: 1,
    id: 'sQEgQpv0l3nvshNycxad',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: '33vqSse9t7ZBt7L9dU4E',
    taskTrackStatus: 'new',
    userId: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
  },
  {
    comments: '',
    date: new Timestamp(1658990476, 0),
    duration: 1,
    id: 'sQEgQpv0l3nvshNycxad',
    overtime: true,
    overtimeDuration: 1,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: '33vqSse9t7ZBt7L9dU4E',
    taskTrackStatus: 'new',
    userId: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
  },
  {
    comments: '',
    date: new Timestamp(1658990476, 0),
    duration: 1,
    id: 'sQEgQpv0l3nvshNycxad',
    overtime: false,
    overtimeDuration: 0,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    taskId: 'XgtweOoksn6fBDSE8i04',
    taskTrackStatus: 'new',
    userId: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
  },
];

export const mockProjects: Project[] = [
  {
    color: '#F8CF45',
    description:
      'From Data To Insights. Smart tool and fast GPU data processing.',
    fullName: 'dataMill',
    id: 'BoavfTxFkFinfWUa8lLd',
    managersId: [
      'mocfzWIHXuYiYbefQMTclEotJr83',
      'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
    ],
    name: 'dataMill',
    tasksId: [],
  },
  {
    color: '#25A18E',
    description:
      'All activities related to site updates, such as new courses announcements and open positions.',
    fullName: 'DataMola official site',
    id: 'DAK4rhvLhUoROKPuKMIz',
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    name: 'datamola.com',
    tasksId: [],
  },
  {
    color: '#fbd304',
    description: 'Education during Angular Course 2022.',
    fullName: 'Angular Course',
    id: 'iyWKSkrUoKRMErqmbSUO',
    managersId: [
      'mocfzWIHXuYiYbefQMTclEotJr83',
      'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
    ],
    name: 'Education',
    tasksId: [],
  },
  {
    color: 'var(--primary)',
    description:
      // eslint-disable-next-line max-len
      'Planned paid vacations managing by Administrator and Unpaid Leaves. Unpaid Leave should be approved by Project Manager.',
    fullName: 'Paid and Unpaid Vacations',
    id: 'kIjYlnhio4ghwoC0CyWf',
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    name: 'Vacations',
    tasksId: [],
  },
  {
    color: '#FF3D71',
    description:
      // eslint-disable-next-line max-len
      'All Holidays for all locations. If holiday should be day off, administrator can assign it to all employees for this location. ',
    fullName: 'National Holidays',
    id: 'lrvIgoy3xaroJTWlBeTx',
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    name: 'Holidays',
    tasksId: [],
  },
  {
    color: 'var(--primary)',
    description: 'Application for tracking work hours and managing projects.',
    fullName: 'TrackMola application',
    id: 'pdCsdrXhodWnZieCfp6O',
    managersId: [
      'mocfzWIHXuYiYbefQMTclEotJr83',
      'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
    ],
    name: 'TrackMola',
    tasksId: [
      '0N9SBvw8R48Ybb1rw3T4',
      '33vqSse9t7ZBt7L9dU4E',
      '7RSD0NbwupaS9X02TNZw',
      '8K3meYpeXrGzpGjnJPnR',
      '8NVvNqnhPXLdvtQOBaU9',
      'DAbIvkXwQTpwc2fSTCyj',
      'EtmWicPcMobMNnSAsbRT',
      'FwXyPX0Ffi17hAmggPFA',
      'Hc4YbEPzpiifROv5sa8O',
      'QKjSwPFnjttXhANdb3ym',
      'QY81kEvbTr0SbeUXnAgg',
      'TDIUIUOVf4jeIG9mAR3W',
      'UWaVlIkICl5i9pAG7bk6',
      'XgtweOoksn6fBDSE8i04',
      'biTabiSBOm6oIEgtTeXb',
      'f0gIlkC9lXqjC8gWcYV3',
      'gE62UaYK4O1ANmriuPrV',
      'gkHHSsV3n1eKiqqDZe27',
      'hn5F9D4QrvTMmFK7sxmB',
      'ns3AEnKBPZba136yvRlX',
      'pr0QyzdmBmfo2gIdkQ0l',
      'qrrUL82KfjnzFWEIToEH',
      'v0LbADWIFPqFSKM6EuMr',
      'wwwKItkbi4XLCeph58X6',
      'xBgaMXjSCTN8snri41dW',
    ],
  },
];

export const mockVacations: Vacation[] = [
  {
    color: '#F4914A',
    comment: '',
    periodEnd: new Timestamp(1660078799, 0),
    periodStart: new Timestamp(1659992400, 0),
    type: 'unpaid',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
  {
    color: '#F4BF4A',
    comment: '',
    periodEnd: new Timestamp(1660165199, 0),
    periodStart: new Timestamp(1660078800, 0),
    type: 'paid',
    userId: 'FyTQtfAXBMPaa3yKJ4TmVVgTA872',
  },
  {
    color: '#f4bf4a',
    comment: '',
    periodEnd: new Timestamp(1660078799, 0),
    periodStart: new Timestamp(1659992400, 0),
    type: 'paid',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    color: '#F4914A',
    comment: '',
    periodEnd: new Timestamp(1660856399, 0),
    periodStart: new Timestamp(1660424400, 0),
    type: 'unpaid',
    userId: 'P4SeopCIcgbAmGkoS8JE0Rq0t1v1',
  },
  {
    color: '#F4CF4A',
    comment: '',
    periodEnd: new Timestamp(1660510799, 0),
    periodStart: new Timestamp(1660424400, 0),
    type: 'other',
    userId: 'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
  },
  {
    color: '#F4914A',
    comment: '',
    periodEnd: new Timestamp(1660856399, 0),
    periodStart: new Timestamp(1660165200, 0),
    type: 'paid',
    userId: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
  },
  {
    color: '#95CE7A',
    comment: '',
    periodEnd: new Timestamp(1660165199, 0),
    periodStart: new Timestamp(1660078800, 0),
    type: 'sick',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
  },
];
