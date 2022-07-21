type Stockpile = {
  items: { term: string; amount: number; name?: string }[]
  genre: string
  requiredName: boolean
}

export const stockpileGet: Stockpile[] = [
  {
    items: [
      {
        term: '2022-07-19',
        amount: 3,
      },
    ],
    genre: '水',
    requiredName: false,
  },
  {
    items: [
      {
        name: '乾パン',
        amount: 3,
        term: '2023-08-30',
      },
      {
        name: 'カロリーメート',
        term: '2023-9-30',
        amount: 100,
      },
    ],
    genre: '食料',
    requiredName: true,
  },
]
