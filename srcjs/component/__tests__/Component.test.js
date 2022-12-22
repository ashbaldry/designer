import { Component } from '../component/Component'

test('Component sanity test - constructs successfully', () => {
  const component = new Component()
  expect(component).toBeDefined()
})

test('Component - basic HTML constructor works', () => {
  const component = new Component()
  expect(component.createComponent()).toEqual('<div></div>')
})

test('Component - replacing placeholders correctly replaces strings', () => {
  const component = new Component()

  const html_1 = '<$tag_name$></$tag_name$>'
  expect(component.replaceHTMLPlaceholders(html_1, { tag_name: 'h1' })).toEqual('<h1></h1>')

  const html_2 = '<$tag_name$>tag_name</$tag_name$>'
  expect(component.replaceHTMLPlaceholders(html_2, { tag_name: 'h1' })).toEqual('<h1>tag_name</h1>')
})

test('Component - replacing placeholders works with multiple placeholders', () => {
  const component = new Component()

  const html_1 = '<$tag_name$>$title$</$tag_name$>'
  expect(component.replaceHTMLPlaceholders(html_1, { tag_name: 'h1', title: 'test' })).toEqual('<h1>test</h1>')

  const html_2 = '<$tag_name$>$title$ - title</$tag_name$>'
  expect(component.replaceHTMLPlaceholders(html_2, { tag_name: 'h1', title: 'test' })).toEqual('<h1>test - title</h1>')
})

test('Component - CSS Units correctly validated', () => {
  const component = new Component()

  expect(component.validateCssUnit(10, 'BAD')).toEqual('10px')
  expect(component.validateCssUnit('10rem', 'BAD')).toEqual('10rem')
  expect(component.validateCssUnit('10sadem', 'BAD')).toEqual('BAD')
})
