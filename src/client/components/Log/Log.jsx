/**
 * Followed slacks logging library: https://slack.engineering/creating-a-react-analytics-logging-library/
 */

import React, { Component } from 'react';

import { sendLog } from '../../utils/Utils';

const Context = React.createContext('');
export const LogContext = Context;

class Log extends Component {
    constructor(props) {
        super(props);
        this.logDOMElementRef = React.createRef(); // locate observed child element
        this.state = {
            isInViewport: false
        };
        this.hasImpressionAlreadyBeenLogged = false;
        this.observerCallback = this.observerCallback.bind(this);
    }

    observerCallback(entries) {
        // The child to observe
        const entry = entries[0];
        if (entry !== undefined && this.state.isInViewport !== entry.isIntersecting) {
            this.setState(() => ({
                isInViewport: entry.isIntersecting
            }));
        }
    }

    componentDidUpdate() {
        if (
            this.props.logImpression &&
            this.state.isInViewport &&
            !this.hasImpressionAlreadyBeenLogged
        ) {
            sendLog(this.combinedProps);
            this.hasImpressionAlreadyBeenLogged = true;
        }
    }

    componentDidMount(){
        if (this.props.logImpression) {
            this.setupObserver();
        }
    }

    setupObserver() {
        this.observer = new IntersectionObserver(this.observerCallback, {
            root: null, // check for observed element being in viewport
            rootMargin: '0px',
            threshold: 0 // avoid offset
        });

        const wrappedDOMElements = this.logDOMElementRef?.current?.childNodes;
        const firstVisibleElement = Array.from(wrappedDOMElements).find((el) => el.offsetParent !== null);
        if (firstVisibleElement) {
            this.observer.observe(firstVisibleElement);
        }
    }

    render() {
        const { children, ...directProps } = this.props;
        return (
            <LogContext.Consumer>
                {(consumedProps) => {
                    this.combinedProps = { ...consumedProps, ...directProps };
                    return (
                        <LogContext.Provider value={this.combinedProps}>
                            {/* contents implies that styling is by children and pseudo elements */}
                            <div style={{ display: 'contents '}} ref={this.logDOMElementRef}>
                                {children}
                            </div>
                        </LogContext.Provider>
                    )
                }}
            </LogContext.Consumer>
        )
    }
}

export default Log;
