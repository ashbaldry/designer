import { FluidPage } from '../FluidPage'

test('sanity test - FluidPage constructs successfully', () => {
  const page = new FluidPage()
  expect(page).toBeDefined()
})
