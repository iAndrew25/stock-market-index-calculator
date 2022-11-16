import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text } from 'react-native-paper';
import tinycolor from 'tinycolor2';
import {
	Svg,
	Rect,
	G,
	Defs,
	Mask,
	Path
} from 'react-native-svg';

function Flag({color, children}) {
	const baseColor = tinycolor(color).toString();
	const darkColor = tinycolor(color).darken(5).toString();
	const lightColor = tinycolor(color).lighten(5).toString();

	return (
		<View style={styles.wrapper}>
			<Svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" width="142" height="96" preserveAspectRatio="none" viewBox="0 0 142 96">
				<G mask="url(&quot;#SvgjsMask1028&quot;)" fill="none">
					<Rect width="142" height="96" x="0" y="0" fill={baseColor}></Rect>
					<Path d="M0,66.733C12.286,66.417,20.955,55.339,31.308,48.717C41.687,42.078,56.969,39.485,60.87,27.798C64.817,15.972,53.61,4.739,49.968,-7.184C46.991,-16.93,46.502,-27.058,41.417,-35.888C35.464,-46.225,28.889,-56.788,18.27,-62.223C6.665,-68.163,-7.472,-71.633,-19.727,-67.185C-31.837,-62.79,-37.395,-49.417,-45.217,-39.181C-52.528,-29.614,-64.085,-21.248,-64.033,-9.207C-63.981,2.813,-50.601,9.919,-44.958,20.532C-39.787,30.257,-40.042,42.46,-32.361,50.354C-23.755,59.198,-12.336,67.05,0,66.733" fill={lightColor}></Path>
					<Path d="M142 139.394C151.166 140.35399999999998 161.234 142.973 169.058 138.103 176.897 133.224 179.286 123.121 182.212 114.364 184.882 106.375 186.423 98.122 185.202 89.788 183.984 81.469 180.859 73.453 175.297 67.148 169.764 60.876 162.208 56.863 154.157 54.597 146.168 52.349 138.061 54.074 129.766 54.334 118.368 54.691 105.826 50.124 96.311 56.41 86.464 62.916 79.761 75.313 80.157 87.108 80.54599999999999 98.696 90.872 107.05799999999999 98.309 115.953 104.02199999999999 122.786 110.505 128.582 118.354 132.793 125.714 136.742 133.693 138.524 142 139.394" fill={darkColor}></Path>
				</G>
				<Defs>
					<Mask id="SvgjsMask1028">
						<Rect width="142" height="96" fill="#ffffff"></Rect>
					</Mask>
				</Defs>
			</Svg>
			{children}
		</View>
	);
}

function Content({text}) {
	return (
		<View style={styles.content}>
			<Text adjustsFontSizeToFit variant="titleMedium" style={styles.contentText}>{text}</Text>				
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: 142,
		height: 96,
		borderRadius: 16,
		overflow: 'hidden'
	},
	content: {
		...StyleSheet.absoluteFill,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8
	},
	contentText: {
		textAlign:'center',
		color: 'white'
	}
});

Flag.Content = Content;

export default Flag;