type RequiredStockpiles = {
  name: string
  amountRequired: number
  unit: string
  imageURL: string
  requireName: boolean
}

export const requiredStockpiles: RequiredStockpiles[] = [
  {
    name: '水',
    amountRequired: 9,
    unit: 'L',
    imageURL: '/water.png',
    requireName: false,
  },
  {
    name: '食料',
    amountRequired: 9,
    unit: '食',
    imageURL: '/food.jpg',
    requireName: true,
  },
  {
    name: '衣類',
    amountRequired: 3,
    unit: 'セット',
    imageURL: '/cloths.png',
    requireName: true,
  },
  {
    name: 'タオル',
    amountRequired: 3,
    unit: '枚',
    imageURL: '/towel.jpg',
    requireName: false,
  },
  {
    name: 'マスク',
    amountRequired: 3,
    unit: '個',
    imageURL: '/mask.jpeg',
    requireName: false,
  },
  {
    name: '予備電池',
    amountRequired: 1,
    unit: '本',
    imageURL: '/battery.jpeg',
    requireName: false,
  },
  {
    name: '懐中電灯',
    amountRequired: 1,
    unit: '個',
    imageURL: '/light.png',
    requireName: false,
  },
  {
    name: 'マッチ',
    amountRequired: 1,
    unit: '箱',
    imageURL: '/match.png',
    requireName: false,
  },
  {
    name: '救急用品',
    amountRequired: 1,
    unit: 'セット',
    imageURL: '/first-aid-kit.png',
    requireName: false,
  },
  {
    name: '使い捨てカイロ',
    amountRequired: 3,
    unit: '個',
    imageURL: '/disposable-body-warmer.png',
    requireName: false,
  },
  {
    name: 'ブランケット',
    amountRequired: 1,
    unit: '枚',
    imageURL: '/blanket.png',
    requireName: false,
  },
  {
    name: 'レインウェア',
    amountRequired: 1,
    unit: '着',
    imageURL: '/rainwear.png',
    requireName: false,
  },
  {
    name: 'ズック靴',
    amountRequired: 1,
    unit: '足',
    imageURL: '/shoes.png',
    requireName: false,
  },
  {
    name: '防災用ヘルメット',
    amountRequired: 1,
    unit: '個',
    imageURL: '/helmet.png',
    requireName: false,
  },
  {
    name: '軍手',
    amountRequired: 1,
    unit: '個',
    imageURL: '/cotton-gloves.png',
    requireName: false,
  },
  {
    name: '洗面用具',
    amountRequired: 1,
    unit: 'セット',
    imageURL: '/face-washing-tools.jpg',
    requireName: false,
  },
  {
    requireName: false,
    name: 'ウエットティッシュ',
    amountRequired: 1,
    unit: '個',
    imageURL: '/wet-wipes.png',
  },
]

const requiredStockpileDict: Partial<Record<string, RequiredStockpiles>> = {}
requiredStockpiles.forEach((x) => (requiredStockpileDict[x.name] = x))
export { requiredStockpileDict }
