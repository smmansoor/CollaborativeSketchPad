import React, { Component } from 'react';
import CollabrativeSketchPad from './component/CollabrativeSketchPad';
import Header from './component/Header';

export default App => {
    return (
        <div>
            <Header></Header>
            <CollabrativeSketchPad></CollabrativeSketchPad>
        </div>
    );
}

