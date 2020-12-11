import React from 'react';
import { ListItem }  from '../../src/index';

export default function OneLineLi(props) {
  let lineText1 =  'A apple is here';
  //let lineText2 =  'An orange is here';
  let dataSets = {'data-name': 'orange', 'data-place': 'desktop'};
  return (
    <>
    <ListItem icon={props.icon} primary={props.lineText2} focusable='true' data={dataSets}/>
    </>
  );
}
