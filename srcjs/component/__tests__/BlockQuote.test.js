import { BlockQuote } from '../component/BlockQuote'

test('sanity test - block quote constructs successfully', () => {
  const component = new BlockQuote()
  expect(component).toBeDefined()
})
