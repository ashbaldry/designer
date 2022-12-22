import { getComponent } from '../utils'
import { Header } from '../Header'
import { Box } from '../Box'

test('getComponent by default returns a header', () => {
  expect(getComponent()).toBeInstanceOf(Header)
})

test('getComponent returns correctly specified component', () => {
  expect(getComponent('header')).toBeInstanceOf(Header)
  expect(getComponent('box')).toBeInstanceOf(Box)
})
