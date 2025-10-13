import { StaffPlanningController } from './staff-planning-controller';

export class StaffPlanningWebController implements StaffPlanningController {
  activeViewHasChanged(viewIndex: number): void {
    // no op
  }

  currentActiveViewIndex(): number {
    return 0;
  }
}
