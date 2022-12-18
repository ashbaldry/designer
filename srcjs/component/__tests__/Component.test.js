import { Component } from '../Component'

test('sanity test - component constructs successfully', () => {
  const component = new Component()
  expect(component).toBeDefined()
})
