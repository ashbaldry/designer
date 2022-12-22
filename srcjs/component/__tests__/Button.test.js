import { Button } from '../Button'

test('sanity test - button constructs successfully', () => {
  const component = new Button()
  expect(component).toBeDefined()
})
