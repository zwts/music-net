import React from 'react';
import { ListItem } from '../../src/index';


export default function TwoLinesLi(props) {
  const lineText1 = '';
  const lineText1_2 = '';
  const lineText2 = '';
  const lineText2_2 = '';
  const dataSets = {
    'data-name': 'orange',
    'data-place': 'desktop'
  };
  return (
    <>
      <ListItem icon={props.icon1} primary={props.lineText1} secondary={lineText1_2}
                focusable='true' outerClass='orange'/>
      <ListItem icon={props.icon2} primary={props.lineText2} secondary={lineText2_2}
                focusable='true' data={dataSets}/>
    </>
  );
}
