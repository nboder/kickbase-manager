export interface StaffPlanningController {
  activeViewHasChanged(viewIndex: number): void;

  currentActiveViewIndex(): number;
}
