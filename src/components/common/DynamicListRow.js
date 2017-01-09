import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default class DynamicListRow extends Component {

    // these values will need to be fixed either within the component or sent through props
    _defaultHeightValue = 100;
    _defaultTransition  = 400;

    state = {
        _rowHeight  : new Animated.Value(this._defaultHeightValue),
        _rowOpacity : new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state._rowOpacity, {
            toValue  : 1,
            duration : this._defaultTransition
        }).start()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.remove) {
            this.onRemoving(nextProps.onRemoving);
        } else {
            this.resetHeight()
        }
    }

    onRemoving(callback) {
        Animated.timing(this.state._rowHeight, {
            toValue  : 0,
            duration : this._defaultTransition
        }).start(callback);
    }

    resetHeight() {
        Animated.timing(this.state._rowHeight, {
            toValue  : this._defaultHeightValue,
            duration : 0
        }).start();
    }

    render() {
        return (
            <Animated.View
                style={{height: this.state._rowHeight, opacity: this.state._rowOpacity}}>
                {this.props.children}
            </Animated.View>
        );
    }
}
