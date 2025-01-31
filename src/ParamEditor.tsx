import React, { Component } from 'react';
import './styles.css';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  readonly props: Readonly<Props>;
  readonly state: Readonly<State>;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues
    };
  }

  handleChange(paramId: number, value: string): void {
    const newParamValues = this.state.paramValues.map(param => 
      param.paramId === paramId ? { ...param, value } : param
    );
    this.setState({ paramValues: newParamValues }); 
  }

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues
    };
  }

  render() {
    return (
      <div className="param-editor">
        {this.props.params.map(param => (
          <div className="param-field" key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={this.state.paramValues.find(p => p.paramId === param.id)?.value || ''}
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ParamEditor;
