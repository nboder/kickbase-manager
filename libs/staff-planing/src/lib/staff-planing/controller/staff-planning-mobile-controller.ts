import { StaffPlanningController } from './staff-planning-controller';

export class StaffPlanningMobileController implements StaffPlanningController {
  private readonly STAFF_SELECTEDTAB_KEY = 'staff_selectedtab_key';
  activeViewHasChanged(viewIndex: number): void {
    sessionStorage.setItem(this.STAFF_SELECTEDTAB_KEY, viewIndex.toString());
  }

  currentActiveViewIndex(): number {
    const activeView = sessionStorage.getItem(this.STAFF_SELECTEDTAB_KEY);
    if (activeView) {
      return parseInt(activeView);
    }
    return 0;
  }
}
