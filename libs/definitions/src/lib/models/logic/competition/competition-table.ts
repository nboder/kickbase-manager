import { CompetitionTableEntry } from './competition-table-entry';
import { CompetitionTableResponse } from '@kickbase/definitions';

export class CompetitionTable {
  readonly tableEntries: CompetitionTableEntry[];

  constructor(tableEntries: CompetitionTableEntry[]) {
    this.tableEntries = tableEntries;
  }

  static createFromApi(
    competitionTable: CompetitionTableResponse
  ): CompetitionTable {
    return new CompetitionTable(
      competitionTable.it.map((data) => {
        return new CompetitionTableEntry(data.tn, data.mc, data.cp, data.cpl);
      })
    );
  }
}
