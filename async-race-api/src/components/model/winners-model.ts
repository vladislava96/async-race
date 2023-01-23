import { garage } from '../../constants/constants';
import { DataTable } from '../../types';
import API from '../api/api';

export default class WinnersModel extends EventTarget {
  private tableDataArray: DataTable[] = [];

  private numberPageValue: number = 1;

  private numberOfWinnersValue: number = 0;

  constructor(private api: API) {
    super();
    this.createTableData();
  }

  public get numberOfWinners(): number {
    return this.numberOfWinnersValue;
  }

  public get numberOfPages(): number {
    return Math.ceil(this.numberOfWinners / 10);
  }

  public get numberPage(): number {
    return this.numberPageValue;
  }

  public set numberPage(numberPage: number) {
    this.numberPageValue = numberPage;
    this.createTableData();
  }

  public get isFirstPage(): boolean {
    return this.numberPage === 1;
  }

  public get isLastPage(): boolean {
    return this.numberPage >= this.numberOfPages;
  }

  public get tableData(): DataTable[] {
    return this.tableDataArray;
  }

  public async createTableData() {
    const tableData: DataTable[] = [];
    const data = await this.api.getWinnersOnPage(this.numberPageValue);
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

    const dataWinners = await this.api.getWinners();
    this.numberOfWinnersValue = dataWinners.length;

    this.dispatchEvent(new CustomEvent('create-table-data'));
  }
}
