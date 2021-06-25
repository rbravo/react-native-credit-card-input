import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


const s = StyleSheet.create({
  baseInputStyle: {
    color: "black",
    flex: 1
  },
  
});

export default class CCInput extends Component {
  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    keyboardType: "numeric",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
  };

  componentWillReceiveProps = newProps => {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;
    const { status: newStatus, value: newValue } = newProps;

    if (value !== "" && newValue === "") onBecomeEmpty(field);
    if (status !== "valid" && newStatus === "valid") onBecomeValid(field);
  };

  focus = () => this.refs.input.focus();

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = value => this.props.onChange(this.props.field, value);

  render() {
    const { label, value, placeholder, status, keyboardType,
            containerStyle, inputStyle, labelStyle,
            validColor, invalidColor, placeholderColor } = this.props;
    return (
      <TouchableOpacity onPress={this.focus}
          activeOpacity={0.99}>
        <View style={[containerStyle]}>
          { !!label && <Text style={[labelStyle]}>{label}</Text>}
          <TextInput ref="input"
              keyboardType={keyboardType}
              autoCapitalise="words"
              autoCorrect={false}
              style={[
                s.baseInputStyle,
                inputStyle,
                ((validColor && status === "valid") ? { color: validColor } :
                 (invalidColor && status === "invalid") ? { color: invalidColor } :
                 {}),
              ]}
              underlineColorAndroid={"transparent"}
              placeholderColor={placeholderColor}
              placeholder={placeholder}
              value={value}
              onFocus={this._onFocus}
              onChangeText={this._onChange} />
        </View>
      </TouchableOpacity>
    );
  }
}
