import { garage } from '../../constants/constants';
import { DataTable } from '../../types';
import API from '../api/api';

export default class WinnersModel extends EventTarget {
  private tableDataArray: DataTable[] = [];

  constructor(private api: API) {
    super();
    this.createTableData();
  }

  public get tableData(): DataTable[] {
    return this.tableDataArray;
  }

  public async createTableData() {
    const tableData: DataTable[] = [];
    const data = await this.api.getWinnersOnPage(1);
    global.console.log(data);
    const promises = data.map(async (winner, index) => {
      const carData = await this.api.getOne(garage, winner.id);
      const tableRowData = {
        number: index + 1,
        car: carData.color,
        name: carData.name,
        wins: winner.wins,
        time: winner.time,
      };
      global.console.log(winner.id, tableRowData);
      tableData.push(tableRowData);
    });
    await Promise.all(promises);
    this.tableDataArray = tableData.sort((first, second) => first.number - second.number);
    this.dispatchEvent(new CustomEvent('create-table-data'));
  }
}
