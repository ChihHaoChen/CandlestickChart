import { IChart } from "../model/date.model"


const PADDING_SIZE = 20

const getYDomain = (rows: IChart[]): [number, number] => {
  const values = rows.map(({high, low}:any) => [high, low]).flat()
  return [Math.min(...values) - PADDING_SIZE, Math.max(...values) + PADDING_SIZE]
}


export default getYDomain
