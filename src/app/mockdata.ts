import { Timestamp } from 'firebase/firestore';

import { User, Task, TaskTrack, Project } from '@shared/interfaces/interfaces';

export const mockUsers: User[] = [
  {
    id: 'FyTQtfAXBMPaa3yKJ4TmVVgTA872',
    email: 'mivakhnenko@datamola.com',
    role: 'CTO',
    position: 'CTO',
    birthday: new Timestamp(900795600, 465000000),
    location: 'Minsk',
    photo: 'https://avatars.githubusercontent.com/u/88663763?v=4',
    fullName: 'Maria Ivakhnenko',
    startDate: new Timestamp(1654030800, 882000000),
    timeZone: '+3',
    qualification: 'Senior',
  },
  {
    id: 'P4SeopCIcgbAmGkoS8JE0Rq0t1v1',
    email: 'vchistiakov@datamola.com',
    birthday: new Timestamp(751672800, 367000000),
    timeZone: '+3',
    startDate: new Timestamp(1654030800, 313000000),
    location: 'Minsk',
    fullName: 'Vitalii Chistiakov',
    role: 'Admin',
    qualification: 'middle',
    position: 'Admin',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/62970818a0eafd0069e86612/69cd9846-5c68-482e-bb26-81bf77da957b/128',
  },
  {
    email: 'vkhodoruk@datamola.com',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6298604da0eafd0069e8f7cd/1656ba5b-b78b-4822-846f-ecb40c4e4899/128',
    qualification: 'Senior',
    timeZone: '+3',
    birthday: new Timestamp(1025125200, 844000000),
    id: 'Y2nsuR3ejZMJxvxHnVZ1hjQlbV32',
    position: 'manager',
    fullName: 'Vladislav Khodoruk',
    location: 'Minsk',
    startDate: new Timestamp(1654030800, 283000000),
    role: 'manager',
  },
  {
    birthday: new Timestamp(802904400, 31000000),
    role: 'employee',
    location: 'Bobruisk',
    qualification: 'Student',
    timeZone: '+3',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/629860aa1a2bdf007095b9bb/181bf52b-1854-4deb-a661-884a6a376802/128',
    startDate: new Timestamp(1654030800, 517000000),
    email: 'kborisenok@datamola.com',
    id: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
    position: 'Frontend developer',
    fullName: 'Kirill Borisenok',
  },
  {
    startDate: new Timestamp(1654030800, 259000000),
    timeZone: '+3',
    birthday: new Timestamp(867904915, 371000000),
    position: 'Frontend Developer',
    qualification: 'Student',
    id: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    email: 'ashinkarev@datamola.com',
    fullName: 'Andrei Shinkarev',
    photo:
      // eslint-disable-next-line max-len
      'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/62985f0ac3dffc0068f5ddff/864cad92-da20-48f3-b5b4-54d2a6c74170/128',
    location: 'Mogilev',
    role: 'employee',
  },
  {
    email: 'employee@google.com',
    position: 'Frontend developer',
    startDate: new Timestamp(1654030800, 211000000),
    birthday: new Timestamp(773010000, 772000000),
    timeZone: '+3',
    fullName: 'Elon Mask',
    role: 'employee',
    photo:
      'https://www.tadviser.ru/images/thumb/b/bc/Elon-SEC-HGK1DB.jpg/840px-Elon-SEC-HGK1DB.jpg',
    id: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    qualification: 'Student',
    location: 'Minsk',
  },
];

export const mockTasks: Task[] = [
  {
    name: 'Daily activity chart',
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    id: '0N9SBvw8R48Ybb1rw3T4',
  },
  {
    id: '33vqSse9t7ZBt7L9dU4E',
    name: 'Create vacations  component',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: false,
  },
  {
    name: 'Working hours chart  component',
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    id: '7RSD0NbwupaS9X02TNZw',
  },
  {
    id: '8K3meYpeXrGzpGjnJPnR',
    name: 'Today view (store)',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: false,
  },
  {
    name: 'Create activity by projects chart component',
    id: '8NVvNqnhPXLdvtQOBaU9',
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    id: 'DAbIvkXwQTpwc2fSTCyj',
    name: 'Projects page polishing',
  },
  {
    name: 'init2',
    projectId: 'lrvIgoy3xaroJTWlBeTx',
    id: 'Dp62ch3RLoOnV2NMjky0',
    archived: false,
  },
  {
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: true,
    id: 'EtmWicPcMobMNnSAsbRT',
    name: 'Create calendar navigation',
  },
  {
    name: 'Add time track form',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    id: 'FwXyPX0Ffi17hAmggPFA',
    archived: false,
  },
  {
    name: 'Dachboard page polishing',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: false,
    id: 'Hc4YbEPzpiifROv5sa8O',
  },
  {
    id: 'QKjSwPFnjttXhANdb3ym',
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'Create active tasks list  component',
  },
  {
    archived: true,
    id: 'QY81kEvbTr0SbeUXnAgg',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'Add authorization',
  },
  {
    id: 'TDIUIUOVf4jeIG9mAR3W',
    archived: true,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'Integrate store',
  },
  {
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: false,
    id: 'UWaVlIkICl5i9pAG7bk6',
    name: 'Activity total cards',
  },
  {
    projectId: 'lrvIgoy3xaroJTWlBeTx',
    id: 'Uo7r5QOnCaSxLBgdYk5X',
    name: 'Init',
    archived: false,
  },
  {
    name: 'Create today wiew component',
    id: 'XgtweOoksn6fBDSE8i04',
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: false,
    id: 'biTabiSBOm6oIEgtTeXb',
    name: 'Create project team',
  },
  {
    id: 'f0gIlkC9lXqjC8gWcYV3',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: true,
    name: 'Add Angular Material',
  },
  {
    name: 'My Activity page polishing',
    archived: false,
    id: 'gE62UaYK4O1ANmriuPrV',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    id: 'gJGIgdv9AagjEnE3ZD2u',
    name: 'init3',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    archived: false,
  },
  {
    archived: true,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'create Team page',
    id: 'gkHHSsV3n1eKiqqDZe27',
  },
  {
    name: 'Projects list with search',
    id: 'hn5F9D4QrvTMmFK7sxmB',
    archived: true,
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'Project tasks list',
    id: 'loY95YR5iaDUjAVa3F1M',
    archived: false,
  },
  {
    archived: false,
    name: 'My report page polishing',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    id: 'ns3AEnKBPZba136yvRlX',
  },
  {
    archived: false,
    id: 'pr0QyzdmBmfo2gIdkQ0l',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'Create profile page',
  },
  {
    name: 'Create Projects Page',
    archived: false,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    id: 'qrrUL82KfjnzFWEIToEH',
  },
  {
    archived: false,
    id: 'v0LbADWIFPqFSKM6EuMr',
    name: 'Daily activity chart(store->chart)',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    projectId: 'pdCsdrXhodWnZieCfp6O',
    archived: true,
    name: 'Calendar week view',
    id: 'wwwKItkbi4XLCeph58X6',
  },
  {
    archived: false,
    id: 'xBgaMXjSCTN8snri41dW',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    name: 'Create project tasks list',
  },
];

export const mockTaskTracks: TaskTrack[] = [
  {
    date: new Timestamp(1656363600, 0),
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 1,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658091600, 0),
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 1,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658291600, 0),
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 3,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658191600, 0),
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 4,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658191600, 0),
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 3,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658191600, 0),
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 3,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658091600, 0),
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 2,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    date: new Timestamp(1658091600, 0),
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 2,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    id: 'rzII60XeOjedTldViiUo',
    duration: 4,
    status: '',
    comments: '',
    date: new Timestamp(16580191600, 0),
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
  },
  {
    date: new Timestamp(1658091600, 0),
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: '96EIUKidaB6vHHBqq8RN',
    duration: 2,
    comments: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
  },
  {
    comments: '',
    date: new Timestamp(1657999999, 0),
    duration: 2,
    id: 'EDcVJRAcvMIM5qt9feQh',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
  },
  {
    comments: '',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
    status: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    date: new Timestamp(1657486800, 0),
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    id: 'EDcVJRAcvMIM5qt9feQh',
    duration: 2,
  },
  {
    projectId: 'pdCsdrXhodWnZieCfp6O',
    comments: 'dsdfdsf',
    duration: 4,
    date: new Timestamp(1657227600, 0),
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    taskId: 'xBgaMXjSCTN8snri41dW',
    status: '',
    id: 'Fet7gIKI537tVEPJjsxh',
  },
  {
    comments:
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iste adipisci facilis perspiciatis quam voluptatum, ipsum asperiores quo, dolor at atque cupiditate, aliquam possimus sapiente impedit placeat! Rerum, voluptatem autem.',
    id: 'LrOC5q7u1DJFkaHK72LX',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    date: new Timestamp(1657314000, 0),
    taskId: 'xBgaMXjSCTN8snri41dW',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    duration: 3,
    status: 'in progress',
  },
  {
    comments: '',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    id: 'MZi0MOIwZA6wKJRufNVF',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    status: '',
    date: new Timestamp(1657486800, 0),
    duration: 3,
  },
  {
    id: 'TF0LuEOYapFhYkzmGnAK',
    date: new Timestamp(1657314000, 0),
    taskId: 'xBgaMXjSCTN8snri41dW',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    duration: 2,
    projectId: 'pdCsdrXhodWnZieCfp6O',
    comments:
      // eslint-disable-next-line max-len
      'vvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv vvvvvvvvvvvvvvvvvvvvvvvvvvv',
    status: 'in progress',
  },
  {
    status: 'in progress',
    id: 'VUW0ERxrxYJlQcU3IhQ7',
    comments: '',
    taskId: '0N9SBvw8R48Ybb1rw3T4',
    date: new Timestamp(1656622800, 0),
    projectId: 'pdCsdrXhodWnZieCfp6O',
    userId: 'oJsHMaprEsZBeyYaAfS8xoR9RP02',
    duration: 3,
  },
  {
    status: 'in progress',
    id: 'aUYyRWCp155mdRx6bZgp',
    date: new Timestamp(1657400400, 0),
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    taskId: 'xBgaMXjSCTN8snri41dW',
    projectId: 'pdCsdrXhodWnZieCfp6O',
    duration: 3,
    comments: '',
  },
  {
    id: 'dBhXfrNBVNovZqE8Zc9B',
    status: '',
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    date: new Timestamp(1657535499, 0),
    comments: '',
    taskId: '33vqSse9t7ZBt7L9dU4E',
    duration: 3,
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
  {
    id: 'rzII60XeOjedTldViiUo',
    duration: 1,
    status: '',
    comments: '',
    date: new Timestamp(1657535499, 0),
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
  },
  {
    id: 'rzII60XeOjedTldViiUo',
    duration: 1,
    status: '',
    comments: '',
    date: new Timestamp(1657535499, 0),
    userId: 'baepq7VLWRVK2XcOQkMHyZlfd6I2',
    taskId: 'gJGIgdv9AagjEnE3ZD2u',
    projectId: 'DAK4rhvLhUoROKPuKMIz',
  },
  {
    duration: 3,
    taskId: '33vqSse9t7ZBt7L9dU4E',
    comments: '',
    date: new Timestamp(1657535499, 0),
    id: 'sQEgQpv0l3nvshNycxad',
    userId: 'ZI4fLQuaHfduoEdxAj7YevkrSq62',
    status: '',
    projectId: 'pdCsdrXhodWnZieCfp6O',
  },
];

export const mockProjects: Project[] = [
  {
    fullName: 'dataMill',
    color: '#F8CF45',
    id: 'BoavfTxFkFinfWUa8lLd',
    name: 'dataMill',
    taskId: [],
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    description:
      'From Data To Insights. Smart tool and fast GPU data processing.',
  },
  {
    name: 'datamola.com',
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    color: '#25A18E',
    description:
      'All activities related to site updates, such as new courses announcements and open positions.',
    fullName: 'DataMola official site',
    taskId: [],
    id: 'DAK4rhvLhUoROKPuKMIz',
  },
  {
    name: 'Education',
    color: '#fbd304',
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    taskId: [],
    id: 'iyWKSkrUoKRMErqmbSUO',
    fullName: 'Angular Course',
    description: 'Education during Angular Course 2022.',
  },
  {
    fullName: 'Paid and Unpaid Vacations',
    taskId: [],
    id: 'kIjYlnhio4ghwoC0CyWf',
    description:
      // eslint-disable-next-line max-len
      'Planned paid vacations managing by Administrator and Unpaid Leaves. Unpaid Leave should be approved by Project Manager.',
    color: 'var(--primary)',
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    name: 'Vacations',
  },
  {
    name: 'Holidays',
    id: 'lrvIgoy3xaroJTWlBeTx',
    taskId: [],
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    description:
      // eslint-disable-next-line max-len
      'All Holidays for all locations. If holiday should be day off, administrator can assign it to all employees for this location. ',
    fullName: 'National Holidays',
    color: '#FF3D71',
  },
  {
    managersId: ['mocfzWIHXuYiYbefQMTclEotJr83'],
    taskId: [
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
    id: 'pdCsdrXhodWnZieCfp6O',
    color: 'var(--primary)',
    name: 'TrackMola',
    description: 'Application for tracking work hours and managing projects.',
    fullName: 'TrackMola application',
  },
];
