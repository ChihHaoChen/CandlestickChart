export interface IChart {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface IData {
  symbol: string
  timeZone: string
}

export interface IChartArr {
  dataArr?: IChart[]
}