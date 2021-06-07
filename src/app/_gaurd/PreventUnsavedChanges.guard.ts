import { Injectable } from '@angular/core'; 
import { CanDeactivate } from '@angular/router';
import { BasicStuEditComponent } from '../demo/ui-elements/ui-basic/basic-stu-edit/basic-stu-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<BasicStuEditComponent> {
  canDeactivate(component: BasicStuEditComponent) {
    if (component.studentForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    } 
    return true;
  }
}
