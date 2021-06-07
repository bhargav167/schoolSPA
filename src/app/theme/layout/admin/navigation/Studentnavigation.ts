import {Injectable} from '@angular/core';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';

export interface StudentNavigationItem {
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
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  }; 
  children?:StuNavigation[];
} 

export interface StuNavigation extends StudentNavigationItem { 
  children?:StudentNavigationItem[];
} 

const StudentNavigationItems = [
  {
    id: 'navigation',
    title: 'Student Navigation',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'Dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/layout/StuDash',
        breadcrumbs: false
      },
      {
        id: 'FeeSatus',
        title: 'Fee',
        type: 'item',
        icon: 'feather icon-home',
        url: '/layout/FeeStatus',
        breadcrumbs: false,
      },
      {
        id: 'Attendace',
        title: 'Attendance',
        type: 'item',
        icon: 'feather icon-home',
        url: '/layout/Attendance',
        breadcrumbs: false
      },
       {
        id: 'tt',
        title: 'Class Timetable',
        type: 'item',
        icon: 'feather icon-home',
         url: '/layout/Timetable',
        breadcrumbs: true
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'Student Managment',
    type: 'group',
    icon: 'feather icon-layers',
    
    children: [
      {
        id: 'basic',
        title: 'Student',
        type: 'collapse',
        icon: 'feather icon-box',
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
            url: '/basic/studentedit/id',
            hidden:'true'
            
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
  
];
 
@Injectable()
export class StudentNavigationItem { 
  public get() {
    return StudentNavigationItems;
  } 
}