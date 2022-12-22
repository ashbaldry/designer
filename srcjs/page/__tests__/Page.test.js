import { Page } from '../Page'

test('sanity test - Page constructs successfully', () => {
  const page = new Page()
  expect(page).toBeDefined()
})
