const Cell = require('../../cell')

describe('when creating a cell', () => {
  test('can create a cell with default values', () => {
    const cell = new Cell()

    expect(cell).toEqual({
      status: 'hidden',
      value: 0
    })
  })

  test('can create a hidden cell with 3 near bombs', () => {
    const cell = new Cell('hidden', 3)

    expect(cell).toEqual({
      status: 'hidden',
      value: 3
    })
  })

  test('can create a hidden cell with a bomb', () => {
    const cell = new Cell('hidden', -1)

    expect(cell).toEqual({
      status: 'hidden',
      value: -1
    })
  })
})