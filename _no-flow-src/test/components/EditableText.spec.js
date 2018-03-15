import { spy } from "sinon";
import React from "react";
import Enzyme, { render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditableText from "../../app/components/EditableText";

Enzyme.configure({ adapter: new Adapter() });

describe("EditableText component", () => {
  const testText = "test text";

  it("should match snapshot", () => {
    const component = render(<EditableText html={testText} />);
    expect(component.html()).toMatchSnapshot();
  });

  it("test should equal testText", () => {
    const component = render(<EditableText html={testText} />);
    expect(component.text()).toEqual(testText);
  });

  it("should be able to be disabled", () => {
    const component = mount(<EditableText html={testText} disabled />);

    expect(
      component
        .find("span")
        .at(0)
        .instance()
        .getAttribute("contentEditable")
    ).toEqual("false");
  });

  it("should be able to be changed", () => {
    const component = mount(<EditableText html={testText} />);
    expect(
      component
        .find("span")
        .at(0)
        .text()
    ).toEqual(testText);
    component
      .find("span")
      .at(0)
      .instance().innerHTML =
      "cake";
    component
      .find("span")
      .at(0)
      .simulate("input");
    expect(
      component
        .find("span")
        .at(0)
        .text()
    ).toEqual("cake");
  });

  it("should call onChange evt on change", () => {
    const onChangeSpy = spy();
    const component = mount(
      <EditableText html={testText} onChange={onChangeSpy} />
    );

    component
      .find("span")
      .at(0)
      .simulate("input");

    expect(onChangeSpy.called).toBe(true);
  });

  it("should call onChange evt & onBlur evt on blur", () => {
    const onChangeSpy = spy();
    const onBlurSpy = spy();
    const component = mount(
      <EditableText html={testText} onChange={onChangeSpy} onBlur={onBlurSpy} />
    );

    component
      .find("span")
      .at(0)
      .simulate("blur");

    expect(onChangeSpy.called).toBe(true);
    expect(onBlurSpy.called).toBe(true);
  });
});
