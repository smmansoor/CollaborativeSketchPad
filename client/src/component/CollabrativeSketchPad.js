import React, { Component } from 'react';
import '../App.css';
import {SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from 'react-sketchpad/lib'
import socket from 'socket.io-client';


class CollabrativeSketchPad extends Component {

  componentDidMount() {
    this.wsClient = socket(`ws://127.0.0.1:8080`);
    this.wsClient.on('addItem', item => this.setState({ items: this.state.items.concat([item]) }));
  }
  constructor(props) {
    super(props);
    this.state = {
      tool: TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }
  render() {
    const { tool, size, color, fill, fillColor, items } = this.state;
    return (

      <div className="container">
        <div className="btn-toolbar" >
          <div className="btn-group">
            <button
              className={tool === TOOL_PENCIL ? 'btn-success' : ''}
              onClick={() => this.setState({ tool: TOOL_PENCIL })}
            >Pencil</button>
            <button
              className={tool === TOOL_LINE ? 'btn-success' : ''}
              onClick={() => this.setState({ tool: TOOL_LINE })}
            >Line</button>
            <button
              className={tool === TOOL_ELLIPSE ? 'btn-success' : ''}
              onClick={() => this.setState({ tool: TOOL_ELLIPSE })}
            >Ellipse</button>
            <button
              className={tool === TOOL_RECTANGLE ? 'btn-success' : ''}
              onClick={() => this.setState({ tool: TOOL_RECTANGLE })}
            >Rectangle</button>
          </div>
          <div>
            <div className="btn-group slidecontainer">
              <span className="label">Size:</span>
              <input min="1" max="20" className="slider" id="myRange" type="range" value={size} onChange={(e) => this.setState({ size: parseInt(e.target.value, 10) })} />
              <span className="label label-primary">Color: </span>
              <input type="color" value={color} onChange={(e) => this.setState({ color: e.target.value })} />
            </div>
          </div>
        </div>
        <div id="sketchpad" className="sketchpad col-med col-centered">
          <SketchPad
            width={720}
            height={600}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={items}
            tool={tool}
            onCompleteItem={(i) => this.wsClient.emit('addItem', i)}
          />
        </div>
      </div>

    );
  }
}
export default CollabrativeSketchPad;
