/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { assert, expect } from 'chai';
import { mount } from 'enzyme';
import HelloWorld from '../components/HelloWorld';

declare const sinon;

describe('<HelloWorld />', () => {
    const descTxt = "TestingThisOneOut";
    let componentDidMountSpy;
    let renderedElement;

    before(() => {
        componentDidMountSpy = sinon.spy(HelloWorld.prototype, 'componentDidMount');
        renderedElement = mount(<HelloWorld description={descTxt} />);
    });

    after(() => {
        componentDidMountSpy.restore();
    });

    // Test for checking if it is working
    it('Should do something', () => {
        assert.ok(true);
    });

    it('<HelloWorld /> should render something', () => {
        expect(renderedElement.find('p')).to.be.exist;
    });

    it('<HelloWorld /> should render the description', () => {
        expect(renderedElement.find('p.description').text()).to.be.equals(descTxt);
    });

    it('<HelloWorld /> should render an ul', () => {
        expect(renderedElement.find('ul')).to.be.exist;
    });

    it('<HelloWorld /> state results should be null', () => {
        expect(renderedElement.state('results')).to.be.null;
    });

    it('<HelloWorld /> should call componentDidMount only once', () => {
        // Check if the componentDidMount is called once
        expect(componentDidMountSpy.calledOnce).to.equal(true);
    });

    it('<HelloWorld /> should render an ul with 3 items (using the mock data)', () => {
        // Wait for 2 seconds to check if your mock results are retrieved
        setTimeout(() => {
            expect(renderedElement.state('results')).to.not.be.null;
            expect(renderedElement.find('ul li').length).to.be.equal(3);
        }, 1000);
    });

    it('<HelloWorld /> should render 10 list items (triggering setState from the test)', () => {
        renderedElement.setState({
            results: {
                value: [
                    { Title: "Mock List 1", Id: '1' },
                    { Title: 'Mock List 2', Id: '2' },
                    { Title: 'Mock List 3', Id: '3' },
                    { Title: 'Mock List 4', Id: '4' },
                    { Title: 'Mock List 5', Id: '5' },
                    { Title: 'Mock List 6', Id: '6' },
                    { Title: 'Mock List 7', Id: '7' },
                    { Title: 'Mock List 8', Id: '8' },
                    { Title: 'Mock List 9', Id: '9' },
                    { Title: 'Mock List 10', Id: '10' }
                ]
            }
        });

        expect(renderedElement.update().state('results')).to.not.be.null;
        expect(renderedElement.update().find('ul li').length).to.be.equal(10);
    });
});
