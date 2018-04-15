/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 10:05:25 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 10:50:17
 */
import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import {FontFamily, FontFamilyBold, FontFamilyLight} from '../res/fonts';
import { textColor } from '../res/color';

const styles = StyleSheet.create({
    light: FontFamilyLight,
    bold: FontFamilyBold,
    font: FontFamily,
    text: { fontSize: 14, color: textColor }
});

type Props = {
    style: any,
    h1: Boolean,
    h2: Boolean,
    h3: Boolean,
    h4: Boolean,
    h5: Boolean,
    h6: Boolean,
    small: Boolean,
    bold: Boolean,
    light: Boolean,
    fontFamily: String,
    children: any,
    rest: any
};

export default class TextLabel extends PureComponent<Props> {
    
    render() {
        const { style, children, h1, h2, h3, h4, h5, h6, small, bold, light, ...rest } = this.props;
        return (
            <Text
                style={[
                    styles.font,
                    styles.text,
                    h1 && { fontSize: 40 },
                    h2 && { fontSize: 34 },
                    h3 && { fontSize: 28 },
                    h4 && { fontSize: 22 },
                    h5 && { fontSize: 20 },
                    h6 && { fontSize: 16 },
                    small && { fontSize: 10 },
                    bold && styles.bold,
                    light && styles.light,
                    style && style,
                ]}
                {...rest}>
                {children}
            </Text>
        );
    }

}


