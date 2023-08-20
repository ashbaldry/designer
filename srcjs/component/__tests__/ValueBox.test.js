import { ValueBox } from '../ValueBox'

test('sanity test - checkbox constructs successfully', () => {
  const component = new ValueBox()
  expect(component).toBeDefined()
})
