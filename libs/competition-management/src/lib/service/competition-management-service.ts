import { inject, Injectable } from '@angular/core';
import {
  CompetitionTable,
  CompetitionTableResponse,
} from '@kickbase/definitions';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
} from '@kickbase/persistence-management';
import { CompetitionApiService } from '@kickbase/api-services';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompetitionManagementService {
  private readonly competitionApiService = inject(CompetitionApiService);
  private readonly persistence: PersistenceManager = inject(
    LocalStoragePersistenceManager,
  );

  fetchCompetitionTable(
    competitionId: string,
  ): Observable<CompetitionTableResponse> {
    return this.competitionApiService.fetchTableOfCompetition(competitionId);
  }
  saveCurrentTable(competitionTable: CompetitionTable) {
    this.persistence.saveCompetitionTable(competitionTable);
  }
}
