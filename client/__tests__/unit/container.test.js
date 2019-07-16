import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import App from '../../src/components/App'

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})

it('can fetch a list of comments and display them', done => {
  const wrapped = mount(
    <App />
  )

  wrapped.find('input').simulate('click')

  // moxios.wait(() => {
  //   wrapped.update()

  //   expect(wrapped.find('li').length).toEqual(2)
    
  //   done()

  //   wrapped.unmount()
  // })
})