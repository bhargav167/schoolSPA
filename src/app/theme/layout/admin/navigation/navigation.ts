import {Injectable} from '@angular/core';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  role:string;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[]; 
} 
//For Admin
const NavigationItems = [
  {
    id: 'navigation',
    title: 'Admin Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/layout/fixed',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'Student Managment',
    type: 'group',
    icon: 'feather icon-student',
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['Admin'] },
    children: [
      {
        id: 'basic',
        title: 'Student',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'res',
            title: 'Register',
            type: 'item',
            url: '/basic/student'
           
          },
          {
            id: 'admission',
            title: 'Admission',
            type: 'item',
            url: '/basic/admission'
          },
          {
            id: 'edit',
            title: 'Edit',
            type: 'item',
            url: '/basic/studentedit/UserId',
            hidden:'true'
            
          },
          {
            id: 'view',
            title: 'view',
            type: 'item',
            url: '/basic/studentview/UserId',
            hidden:'true' 
          }, 
          {
            id: 'badges',
            title: 'Students',
            type: 'item',
            url: '/basic/studentlist'
          },
          {
            id: 'feestatus',
            title: '',
            type: 'item',
            url: '/basic/feeStatus/id',
            hidden:'true' 
          },
        ]
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'Employee Managment',
    type: 'group',
    icon: 'feather icon-layers',
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['Admin'] },
    children: [
      {
        id: 'basic',
        title: 'Employee',
        type: 'collapse',
        icon: 'feather icon-user',
        children: [
          {
            id: 'res',
            title: 'Register',
            type: 'item',
            url: '/basic/EmployeeRegister'
          },
          {
            id: 'admission',
            title: 'View',
            type: 'item',
            url: '/basic/admission'
          },
          {
            id: 'edit',
            title: 'Edit',
            type: 'item',
            url: '/basic/empedit/id',
            hidden:'true',
            breadcrumbs: false
            
          },
          {
            id: 'view',
            title: 'view',
            type: 'item',
            url: '/basic/studentview/id',
            hidden:'true' 
          }, 
          {
            id: 'badges',
            title: 'Employee',
            type: 'item',
            url: '/basic/emplist',
            canActivate:[AuthGaurd],
            data:{permittedRoles:['Admin']},
          }
        ]
      }
    ]
  },
  {
    id: 'forms-table',
    title: 'Fee Section',
    type: 'group',
    icon: 'feather icon-layout',
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['Admin'] },
    children: [
      {
        id: 'forms-element',
        title: 'Fee',
        type: 'item',
        icon: 'feather icon-file-text',
        url: '/forms/basic',
        breadcrumbs: false
      }, 
      {
        id: 'forms-element',
        title: 'Fee',
        type: 'item',
        icon: 'feather icon-file-text',
        url: '/forms/Feeparticular',
        hidden:'true',
        breadcrumbs: false
      }, 
      {
        id: 'forms-element',
        title: 'Fee',
        type: 'item', 
        icon: 'feather icon-dollar-sign',
        url: '/forms/Feepackaging',
        hidden:'true',
        breadcrumbs: false
      }, 
      {
        id: 'forms-element',
        title: 'Fee',
        type: 'item', 
        icon: 'feather icon-dollar-sign',
        url: '/forms/AddFeePackaging',
        hidden:'true',
        breadcrumbs: false
        
      }, 
      {
        id: 'forms-element',
        title: 'Fee',
        type: 'item', 
        icon: 'feather icon-dollar-sign',
        url: '/forms/CollectFee',
        hidden:'true',
        breadcrumbs: false
      }, 
      {
        id: 'forms-element',
        title: 'Setting',
        type: 'item', 
        icon: 'feather icon-settings',
        url: '/forms/Setting', 
        breadcrumbs: false
      }, 
    ]
  },
  {
    id: 'Attendance',
    title: 'Attendance',
    type: 'group',
    icon: 'feather icon-pie-chart',
    children: [
      {
        id: 'charts',
        title: 'Take Attendance',
        type: 'item',
        url: '/basic/TakeAttendance',
        icon: 'feather icon-pie-chart',
      },
      {
        id: 'report',
        title: 'Show Attendance',
        type: 'item',
        url: '/basic/AttendanceReport',
        icon: 'feather icon-pie-chart',
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'Acadmic',
        title: 'Acadmics',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'classtimetable',
            title: 'Class TimeTable',
            type: 'item',
            url: '/Acadmic/AcadmicClassTimetable',
           children:[ 
           ]
          },
          {
            id: 'classes',
            title: 'Class',
            type: 'item',
            url: '/Acadmic/AcadmicClass'
           
          },
          {
            id: 'section',
            title: 'Section',
            type: 'item',
            url: '/Acadmic/AcadmicSection'
           
          },
          {
            id: 'subject',
            title: 'Subject',
            type: 'item',
            url: '/Acadmic/AcadmicSubject'
          },
          {
            id: 'subjecgroup',
            title: 'Subject Group',
            type: 'item',
            url: '/Acadmic/SubjectGroup'
          },
          {
            id: 'addtimetable',
            title: 'Add Class TimeTable',
            type: 'item',
            url: '/Acadmic/AddClassTimetable',
            hidden:true
          },
          {
            id: 'assignteacher',
            title: 'Assign Class Teacher',
            type: 'item',
            url: '/Acadmic/AssignClassTeacher'
          }
        ]
      },
      {
        id: 'homework',
        title: 'HomeWork',
        type: 'collapse',
        icon: 'feather icon-box', 
        children: [
          {
            id: 'adminhomework',
            title: 'Add Homework',
            type: 'item',
            url: '/homework', 
          } 
        ]
      },
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
        hidden:true
      },
      {
        id: 'Forbidden',
        title: 'Forbidden Page',
        type: 'item',
        url: '/Forbidden',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
        hidden:'true',
      },
      {
        id: 'ZoomLiveClass',
        title: 'Zoom Live Classes',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'zoomliveclass',
            title: 'Live Class',
            type: 'item',
            url: '/ZoomLiveClass/LiveClass'
          },
        ]
      },
      {
        id: 'Profile',
        title: 'Profile',
        type: 'collapse',
        icon: 'feather icon-box',
        hidden:true,
        children: [
          {
            id: 'adminProfile',
            title: 'AdminProfile',
            type: 'item',
            url: '/Profile/AdminProfile', 
          } 
        ]
      }
    ]
  }
];

@Injectable()
export class NavigationItem { 
  public get() {
    return NavigationItems;
  }   
}
