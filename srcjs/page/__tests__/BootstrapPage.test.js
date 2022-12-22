import { BootstrapPage } from '../BootstrapPage'

test('sanity test - BootstrapPage constructs successfully', () => {
  const page = new BootstrapPage()
  expect(page).toBeDefined()
})
