import { spy } from 'sinon';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import React from 'react';
import Enzyme, { render, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SpinOnHoverFontAwesome from '../../app/components/SpinOnHoverFontAwesome';

Enzyme.configure({ adapter: new Adapter() });

describe('SpinOnHoverFontAwesome component', () => {
  it('should match snapshot', () => {
    const component = mount(<SpinOnHoverFontAwesome icon={faEdit} />);

    expect(component.find('svg').length).toEqual(1);
  });

  it('should initially have false mouseOver state', () => {
    const component = shallow(<SpinOnHoverFontAwesome icon={faEdit} />);
    expect(component.state().mouseOver).toBe(false);
  });

  it('should respond to mouse over/out events', () => {
    const component = shallow(<SpinOnHoverFontAwesome icon={faEdit} />);

    component.simulate('mouseover');

    expect(component.state().mouseOver).toBe(true);

    component.simulate('mouseout');

    expect(component.state().mouseOver).toBe(false);
  });

  it('should respond to focus/blur events', () => {
    const component = shallow(<SpinOnHoverFontAwesome icon={faEdit} />);

    component.simulate('focus');

    expect(component.state().mouseOver).toBe(true);

    component.simulate('blur');

    expect(component.state().mouseOver).toBe(false);
  });
});
